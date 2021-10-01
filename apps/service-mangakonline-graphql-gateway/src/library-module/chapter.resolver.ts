import { Types, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
import ParseObjectIdPipe from '@mp-workspace/utils-nest-parse-objectid-pipe';
import type { DeleteChapterInput, DeleteChapterPayload, DeleteChaptersInput, DeletePicturesPayload } from '../graphql.schema';
import { LibraryService } from './library.service';
import {
  CreateChapterDto,
} from './dto';
import type { LibraryChapterEntityDocument } from './schemas/chapter.schema';
import { LibraryChapterEntitySchemaName } from './schemas/chapter.schema';

type DeleteChapterResponse = Omit<DeleteChapterPayload, '_id'> & {
  _id?: Types.ObjectId;
};

type DeleteChaptersResponse = Omit<DeletePicturesPayload, '_ids'> & {
  _ids?: Types.ObjectId[];
};

@Resolver('LibraryChapterEntity')
export class ChapterResolver {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly mediaService: DataAccessMediaService,
    @InjectModel(LibraryChapterEntitySchemaName)
    private readonly libraryChapterEntity: Model<LibraryChapterEntityDocument>,
  ) {}

  @Query('chapter')
  chapter(
    @Args('_id', ParseObjectIdPipe)
      _id: Types.ObjectId,
  ): Promise<LibraryChapterEntityDocument> {
    return this.libraryService.findLibraryChapter(_id);
  }

  @Query('findChapterBySlug')
  findChapterBySlug(
    @Args('slug')
      slug: string,
  ): Promise<LibraryChapterEntityDocument> {
    return this.libraryService.findLibraryChapterBySlug(slug);
  }

  @Query('findChapterByBookSlug')
  async findChapterByBookSlug(
    @Args('slug') slug: string,
    @Args('first') first: number,
    @Args('after', ParseObjectIdPipe) after: Types.ObjectId,

    @Args('last') last: number,
    @Args('before', ParseObjectIdPipe) before: Types.ObjectId,
  ) {
    const book = await this.libraryService.findLibraryBookBySlug(slug);
    return this.libraryService.findAllLibraryChapterByIds({
      first,
      after,
      last,
      before,
      book: book._id
    });
  }

  @Query('findChaptersByBookSlugOffsetPaging')
  async findChaptersByBookSlugOffsetPaging(
    @Args('slug') slug: string,
    @Args('first') first: number,
    @Args('last') last: number,
    @Args('offset') offset: number,
  ) {
    const book = await this.libraryService.findLibraryBookBySlug(slug);
    return this.libraryService.findAllLibraryChaptersOffsetPagingByBookId({
      first,
      last,
      offset,
      book: book._id
    });
  }

  @Query('chapters')
  async chapters(
    @Args('first') first: number,
    @Args('after', ParseObjectIdPipe) after: Types.ObjectId,
    @Args('last') last: number,
    @Args('before', ParseObjectIdPipe) before: Types.ObjectId,
  ) {
    return this.libraryService.chapters({
      first,
      after,
      last,
      before,
    });
  }

  @Mutation()
  async createNewChapter(@Args('input') input: CreateChapterDto) {
    const chapter = await this.libraryService.createNewChapter(input);
    return {
      chapter
    };
  }

  @ResolveField()
  cover(@Parent() chapter: LibraryChapterEntityDocument) {
    const { cover } = chapter;
    return this.mediaService.getPicture(cover);
  }

  @ResolveField()
  book(@Parent() chapter: LibraryChapterEntityDocument) {
    const { book } = chapter;
    return this.libraryService.findLibraryBook(book);
  }

  @ResolveField()
  images(@Parent() chapter: LibraryChapterEntityDocument) {
    const { images } = chapter;
    return this.mediaService.getPictures(images);
  }

  @ResolveField()
  nextChapter(@Parent() chapter: LibraryChapterEntityDocument) {
    const { _id, book, number } = chapter;
    return this.libraryChapterEntity.find({
      $and: [ {
        _id: {
          $ne: _id
        }
      }, {
        book: {
          $eq: book
        }
      }, {
        number: {
          $gte: number
        }
      }]
    }).limit(10).sort({
      number: 1
    }).exec();
  }

  @Mutation()
  async deleteChapter(@Args('input') input: DeleteChapterInput): Promise<DeleteChapterResponse> {
    const { id } = input;
    const result = await this.libraryService.deleteChapter(id);

    return {
      _id: result
    };
  }

  @Mutation()
  async deleteChapters(@Args('input') input: DeleteChaptersInput): Promise<DeleteChaptersResponse> {
    const { ids } = input;
    const result = await this.libraryService.deleteChapters(ids);
    return {
      _ids: result
    };
  }
}
