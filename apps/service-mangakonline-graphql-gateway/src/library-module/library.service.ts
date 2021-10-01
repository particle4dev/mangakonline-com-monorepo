import * as url from "url";
import DataLoader from 'dataloader';
import { Injectable, Logger } from '@nestjs/common';
import { Model, Types, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserInputError
} from 'apollo-server-express';
import slugify from '@mp-workspace/util-penguin-ui-slugify';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
import { toObjectId } from '@mp-workspace/utils-nest-parse-objectid-pipe';
import { DataAccessCatalogService } from '@mp-workspace/data-access-nest-catalog-module';
import type { CursorPagingInput, OffsetPagingInput } from '../type';
import {
  LibraryChapterEntityConnection,
  LibraryChapterEntityOffsetPagingConnection,
  LibraryBookEntityCursorPagingConnection,
  BookOrder
} from '../graphql.schema';
import { LibraryBookEntityDocument, LibraryBookEntitySchemaName } from './schemas/book.schema';
import { LibraryChapterEntityDocument, LibraryChapterEntitySchemaName } from './schemas/chapter.schema';
import {
  __createBookByIdsLoader
} from './loaders/books.loader';
import {
  CreateBookDto,
  CreateChapterDto
} from './dto';

type GetAllChapterInput = CursorPagingInput & {
  book: Types.ObjectId
};

type FindAllLibraryBooksInput = Omit<CursorPagingInput, 'after' | 'before'> & {
  after?: string,
  before?: string,
  orderBy?: BookOrder
};

type GetAllChapterResponse = Omit<LibraryChapterEntityConnection, 'edges'> & {
  edges?: LibraryChapterEntityDocument[]
};

type FindingAllLibraryChaptersOffsetPagingInput = OffsetPagingInput & {
  book: Types.ObjectId
};

type FindingAllLibraryChaptersOffsetPagingResponse = Omit<LibraryChapterEntityOffsetPagingConnection, 'edges'> & {
  edges?: LibraryChapterEntityDocument[]
};

type FindingAllLibraryBookByCategoryInput = CursorPagingInput & {
  category: string
};

type LibraryBookEntityCursorPagingConnectionResponse = Omit<LibraryBookEntityCursorPagingConnection, 'edges'> & {
  edges?: LibraryBookEntityDocument[]
};

@Injectable()
export class LibraryService {
  private readonly bookByIds: DataLoader<Types.ObjectId, LibraryBookEntityDocument> | null;
  private readonly logger = new Logger(LibraryService.name);

  constructor(
    private readonly catalogService: DataAccessCatalogService,

    private readonly mediaService: DataAccessMediaService,

    @InjectModel(LibraryBookEntitySchemaName)
    private readonly libraryBookModel: Model<LibraryBookEntityDocument>,

    @InjectModel(LibraryChapterEntitySchemaName)
    private readonly libraryChapterModel: Model<LibraryChapterEntityDocument>,
  ) {
    this.bookByIds = __createBookByIdsLoader(this.libraryBookModel);
  }

  async createNewBook({ slug, title, cover, description, categories = [], connections = [] }: CreateBookDto, skipError: boolean): Promise<LibraryBookEntityDocument | undefined> {
    const isFound = await this.libraryBookModel.findOne({
      slug
    });

    categories = await Promise.all(categories.map(async category => {
      const id = toObjectId(category);
      if(!id) return id;
      const c = await this.catalogService.findCatalogCategoryById(id);
      if(!c) {
        this.logger.log(`Warning: not found ${category} category data when creating new book.`);
        return null;
      }
      return c._id;
    }));

    categories = categories.filter(category => !!category);

    if(isFound && !skipError) {
      throw new UserInputError(`${slug} slug book is exists`, {
        invalidArgs: Object.keys({
          slug
        }),
      });
    }
    if(isFound && skipError) {
      return isFound;
    }

    // convert connections
    const cons = connections.map((link: string) => {
      const u = url.parse(link);
      return {
        id: u.host,
        url: link
      };
    });
    const newBook = new this.libraryBookModel();
    newBook.slug = slug;
    newBook.title = title;
    newBook.cover = cover;
    newBook.categories = categories;
    newBook.description = description;
    newBook.connections = cons;

    return await newBook.save();
  }

  async createNewChapter({
    slug,
    title,
    book,
    number,
    releaseDate,
    images,
    cover,
    connections = []
  }: CreateChapterDto): Promise<LibraryChapterEntityDocument | undefined> {
    const bookDocument = await this.libraryBookModel.findOne({
      _id: toObjectId(book)
    });

    if(!bookDocument) {
      throw new UserInputError(`${book} book is exists`, {
        invalidArgs: Object.keys({
          book
        }),
      });
    }

    let chapterSlug = slug;

    if(!chapterSlug || chapterSlug === '') {
      chapterSlug = slugify(`chapter-${number}`);
    }

    chapterSlug = slugify(`${bookDocument.slug}-${chapterSlug}`, {
      charmap: {
        _: '-'
      }
    });

    const isFound = await this.libraryChapterModel.findOne({
      slug: chapterSlug
    });
    if(isFound) {
      return isFound;
    }

    const newChapter = new this.libraryChapterModel();
    newChapter.slug = chapterSlug;

    // convert connections
    const cons = connections.map((link: string) => {
      const u = url.parse(link);
      return {
        id: u.host,
        url: link
      };
    });

    if(!title || title === '') {
      newChapter.title = `Chapter ${number}`;
    } else {
      newChapter.title = title;
    }

    newChapter.book = bookDocument._id;
    newChapter.cover = toObjectId(cover);
    newChapter.number = number;
    newChapter.releaseDate = new Date(releaseDate);
    newChapter.images = images.map(toObjectId);
    newChapter.connections = cons;

    // update book's updatedAt
    await this.libraryBookModel.updateOne({ _id: bookDocument._id }, {
      $set: { updatedAt: new Date() },
      $inc: { totalChapters: 1 }
    });

    return await newChapter.save();
  }

  async findRelatedBooks(_id: Types.ObjectId): Promise<LibraryBookEntityDocument[]> {
    const book = await this.libraryBookModel.findOne({
      _id
    });

    return this.libraryBookModel.find({
      $and: [
        {
          categories: {
            $in: book.categories
          }
        },
        {
          _id: {
            $ne: _id
          }
        }
      ]
    }).sort({
      updatedAt: -1
    }).limit(12).exec();
  }

  async findAllLibraryBooks(input: FindAllLibraryBooksInput): Promise<LibraryBookEntityCursorPagingConnectionResponse> {
    const {
      first,
      last,
      orderBy
    } = input;

    const basedQuery = {};

    // const query: FilterQuery<LibraryChapterEntityDocument> = Object.assign({}, basedQuery);
    const query: any = Object.assign({}, basedQuery);

    let orderField = 'updatedAt';

    if(orderBy.field === 'CREATED_AT') {
      orderField = 'createdAt';
    }

    const after = input.after ? new Date(parseInt(input.after)) : null;

    const before = input.before ? new Date(parseInt(input.before)) : null;

    const limit = first || last;

    const sort = {
      [orderField]: first ? -1 : 1
    };

    if(after) {
      query[orderField] = {
        $lt: after
      };
    }

    if(before) {
      query[orderField] = {
        $gt: before
      };
    }

    const edges = await this.libraryBookModel.find(query, null, {
      limit,
      sort
    });

    const endCursor = edges.length > 0 ? edges[edges.length - 1][orderField] : null;
    const startCursor = edges.length > 0 ? edges[0][orderField] : null;

    const hasNextPage = !!await this.libraryBookModel.findOne({
      [orderField]: {
        $lt: endCursor
      }
    });

    const hasPreviousPage = !!await this.libraryBookModel.findOne({
      [orderField]: {
        $gt: startCursor
      }
    });

    return {
      pageInfo: {
        total: await this.libraryBookModel.countDocuments(basedQuery),
        hasNextPage,
        hasPreviousPage,
        endCursor: `${endCursor.getTime()}`,
        startCursor: `${startCursor.getTime()}`,
      },
      edges
    };
  }

  findLibraryBook(_id: Types.ObjectId): Promise<LibraryBookEntityDocument | undefined> {
    return this.bookByIds.load(_id);
  }

  findLibraryBookBySlug(slug: string): Promise<LibraryBookEntityDocument | undefined> {
    return this.libraryBookModel.findOne({
      slug
    }).exec();
  }

  getTotalChaptersByBook(book: Types.ObjectId): Promise<number | undefined> {
    return this.libraryChapterModel.countDocuments({
      book
    }).exec();
  }

  findLibraryChapter(_id: Types.ObjectId): Promise<LibraryChapterEntityDocument | undefined> {
    return this.libraryChapterModel.findOne({
      _id
    }).exec();
  }

  findLibraryChapterBySlug(slug: string): Promise<LibraryChapterEntityDocument | undefined> {
    return this.libraryChapterModel.findOne({
      slug
    }).exec();
  }

  async findAllLibraryBookByCategory(input: FindingAllLibraryBookByCategoryInput): Promise<LibraryBookEntityCursorPagingConnectionResponse> {
    const {
      first,
      after,

      last,
      before,
      category
    } = input;
    const categoryDocument = await this.catalogService.findCatalogCategoryBySlug(category);

    if(!categoryDocument) {
      throw new UserInputError(`${category} category is not found`, {
        invalidArgs: Object.keys({
          category
        }),
      });
    }

    const basedQuery = {
      categories: categoryDocument._id
    };

    // const query: FilterQuery<LibraryChapterEntityDocument> = Object.assign({}, basedQuery);
    const query: any = Object.assign({}, basedQuery);

    const sort = {
      _id: -1
    };

    const limit = first || last;

    if(after) {
      query._id = {
        $lt: after
      };
    }

    if(before) {
      query._id = {
        $gt: before
      };
    }

    const edges = await this.libraryBookModel.find(query, null, {
      limit,
      sort
    });

    const endCursor = edges.length > 0 ? edges[edges.length - 1]._id : null;
    const startCursor = edges.length > 0 ? edges[0]._id : null;

    const hasNextPage = !!await this.libraryBookModel.findOne({
      _id: {
        $lt: endCursor
      },
      categories: categoryDocument._id
    });

    const hasPreviousPage = !!await this.libraryBookModel.findOne({
      _id: {
        $gt: startCursor
      },
      categories: categoryDocument._id
    });

    return {
      pageInfo: {
        total: await this.libraryBookModel.countDocuments(basedQuery),
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
      edges
    };
  }


  // findAllLibraryChapterByIds(book: Types.ObjectId): Promise<LibraryChapterEntityDocument[] | undefined> {
  //   return this.libraryChapterModel.find({
  //     book
  //   }).sort({
  //     number: -1,
  //     releaseDate: -1
  //   }).exec();
  // }

  async chapters(input: CursorPagingInput): Promise<GetAllChapterResponse> {
    const {
      first,
      after,

      last,
      before,
    } = input;
    const basedQuery = {};

    const query: FilterQuery<LibraryChapterEntityDocument> = Object.assign({}, basedQuery);

    const sort = {
      _id: -1
    };

    const limit = first || last;

    if(after) {
      query._id = {
        $lt: after
      };
    }

    if(before) {
      query._id = {
        $gt: before
      };
    }

    const edges = await this.libraryChapterModel.find(query, null, {
      limit,
      sort
    });

    const endCursor = edges.length > 0 ? edges[edges.length - 1]._id : null;
    const startCursor = edges.length > 0 ? edges[0]._id : null;

    const hasNextPage = !!await this.libraryChapterModel.findOne({
      _id: {
        $lt: endCursor
      }
    });

    const hasPreviousPage = !!await this.libraryChapterModel.findOne({
      _id: {
        $gt: startCursor
      }
    });

    return {
      pageInfo: {
        total: await this.libraryChapterModel.countDocuments(basedQuery),
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
      edges
    };
  }

  async findAllLibraryChapterByIds(input: GetAllChapterInput): Promise<GetAllChapterResponse> {
    const {
      first,
      after,

      last,
      before,
      book
    } = input;
    const basedQuery = {
      book
    };

    const query: FilterQuery<LibraryChapterEntityDocument> = Object.assign({}, basedQuery);

    const sort = {
      _id: -1
    };

    const limit = first || last;

    if(after) {
      query._id = {
        $lt: after
      };
    }

    if(before) {
      query._id = {
        $gt: before
      };
    }

    const edges = await this.libraryChapterModel.find(query, null, {
      limit,
      sort
    });

    const endCursor = edges.length > 0 ? edges[edges.length - 1]._id : null;
    const startCursor = edges.length > 0 ? edges[0]._id : null;

    const hasNextPage = !!await this.libraryChapterModel.findOne({
      _id: {
        $lt: endCursor
      }
    });

    const hasPreviousPage = !!await this.libraryChapterModel.findOne({
      _id: {
        $gt: startCursor
      }
    });

    return {
      pageInfo: {
        total: await this.libraryChapterModel.countDocuments(basedQuery),
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
      edges
    };
  }

  async findAllLibraryChaptersOffsetPagingByBookId(input: FindingAllLibraryChaptersOffsetPagingInput): Promise<FindingAllLibraryChaptersOffsetPagingResponse> {
    const {
      first,
      offset,
      last,
      book
    } = input;
    const basedQuery = {
      book
    };

    const query: FilterQuery<LibraryChapterEntityDocument> = Object.assign({}, basedQuery);

    const sort = {
      number: -1
    };

    let limit = first || last;
    let skip = last ? offset - limit : offset;
    if(skip < 0) {
      // Note: trong trường hợp skip < 0
      // tức là offset = 3 và ta lấy 10 phần tử trước đó
      // dĩ nhiêm không thể trả về 10
      // nên limit += skip = 10 + -7 = 3
      limit += skip;
      skip = 0;
    }
    const edges = await this.libraryChapterModel.find(query, null, {
      limit,
      sort,
      skip
    });

    return {
      pageInfo: {
        total: await this.libraryChapterModel.countDocuments(basedQuery),
        offset,
        limit
      },
      edges
    };
  }

  async deleteChapter(id: Types.ObjectId | string): Promise<Types.ObjectId | undefined> {
    const _id = toObjectId(id);
    const chapter = await this.libraryChapterModel.findOne({
      _id
    });

    if(!chapter) {
      // FIXME: should we throw an error when chapter is not found.
      return undefined;
    }

    // delete images
    const { images, cover } = chapter;
    await this.mediaService.deletePictures({
      ids: [
        ...images,
        cover
      ]
    });

    // delete chapter
    const result = await this.libraryChapterModel.findOneAndRemove({
      _id: chapter._id
    });

    // update totalChapters field
    await this.libraryBookModel.findOneAndUpdate({
      _id: chapter.book
    }, {
      $inc: { totalChapters: -1 }
    });

    return result._id;
  }

  async deleteChapters(ids: (Types.ObjectId | string)[]): Promise<Types.ObjectId[]> {
    const _ids = ids.map(e => toObjectId(e));

    const chapters = [];
    let images = [];
    const cursor = this.libraryChapterModel.find({
      _id: _ids
    }, { _id: 1, images: 1, cover: 1, book: 1 }).cursor();

    for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
      chapters.push(doc);
      images.push(doc.cover);
      images = images.concat(doc.images);
    }

    // delete images
    await this.mediaService.deletePictures({
      ids: images
    });

    await this.libraryChapterModel.deleteMany({
      _id: chapters.map(e => e._id)
    });

    // update totalChapters field
    for (let i = 0; i < chapters.length; i += 1) {
      const chapter = chapters[i];
      await this.libraryBookModel.findOneAndUpdate({
        _id: chapter.book
      }, {
        $inc: { totalChapters: -1 }
      });
    }

    return chapters.map(e => e._id);
  }

  async deleteBook(slug: string): Promise<Types.ObjectId | undefined> {
    const book = await this.libraryBookModel.findOne({
      slug
    });

    if(!book) {
      return undefined;
    }

    let chapters = await this.libraryChapterModel.find({
      book: book._id
    }, {_id: 1});

    // delete chapters
    await this.deleteChapters(chapters.map(c => c._id));

    // delete book
    const result = await this.libraryBookModel.findOneAndRemove({
      _id: book._id
    });

    return result._id;
  }
}
