import DataLoader from 'dataloader';
import isString from 'lodash/isString';
import isArray from 'lodash/isArray';
import { Injectable } from '@nestjs/common';
import { Model, Types, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  UserInputError
} from 'apollo-server-express';
import type { TCursorPagingInput, TCursorPagingResponse } from './types';
import { toObjectId } from '@mp-workspace/utils-nest-parse-objectid-pipe';
import {
  CatalogBigramEntityDocument,
  CatalogBigramEntitySchemaName
} from './schemas/bigram.schema';
import {
  CatalogCategoryEntityDocument,
  CatalogCategoryEntitySchemaName
} from './schemas/category.schema';
import {
  CatalogCustomCollectionEntityDocument,
  CatalogCustomCollectionEntitySchemaName
} from './schemas/customcollection.schema';
import {
  __createCategoryByIdsLoader,
  __createCategoryBySlugsLoader,
  __createCustomCollectionByIdsLoader,
  __createCustomCollectionBySlugsLoader
} from './loaders';
import {
  CreateCategoryDto,
  CreateCustomCollectionDto,
  UpdateCategoryCustomCollectionDto
} from './dto';

type CursorPagingInput = TCursorPagingInput;

type CursorPagingResponse = TCursorPagingResponse<CatalogCategoryEntityDocument>;

@Injectable()
export class DataAccessCatalogService {
  private readonly categoryByIds: DataLoader<Types.ObjectId, CatalogCategoryEntityDocument> | null
  private readonly categoryBySlugs: DataLoader<string, CatalogCategoryEntityDocument> | null;

  private readonly customCollectionByIds: DataLoader<Types.ObjectId, CatalogCustomCollectionEntityDocument> | null
  private readonly customCollectionBySlugs: DataLoader<string, CatalogCustomCollectionEntityDocument> | null;

  constructor(
    @InjectModel(CatalogBigramEntitySchemaName)
    private readonly catalogBigramModel: Model<CatalogBigramEntityDocument>,
    @InjectModel(CatalogCategoryEntitySchemaName)
    private readonly catalogCategoryModel: Model<CatalogCategoryEntityDocument>,
    @InjectModel(CatalogCustomCollectionEntitySchemaName)
    private readonly catalogCustomCollectionModel: Model<CatalogCustomCollectionEntityDocument>,
  ) {
    this.categoryByIds = __createCategoryByIdsLoader(this.catalogCategoryModel);
    this.categoryBySlugs = __createCategoryBySlugsLoader(this.catalogCategoryModel);
    this.customCollectionByIds = __createCustomCollectionByIdsLoader(this.catalogCustomCollectionModel);
    this.customCollectionBySlugs = __createCustomCollectionBySlugsLoader(this.catalogCustomCollectionModel);
  }

  // findOne
  findCatalogCategoryById(_id: Types.ObjectId): Promise<undefined | CatalogCategoryEntityDocument> {
    return this.categoryByIds.load(_id);
  }

  findCatalogCategoryByLabel(label: string): Promise<CatalogCategoryEntityDocument | undefined> {
    return this.catalogCategoryModel.findOne({
      label
    }).exec();
  }

  findCatalogCategoryBySlug(slug: string): Promise<CatalogCategoryEntityDocument | undefined> {
    return this.categoryBySlugs.load(slug);
  }

  findCatalogCustomCollectionBySlug(slug: string): Promise<undefined | CatalogCustomCollectionEntityDocument> {
    return this.customCollectionBySlugs.load(slug);
  }

  // findMany
  findCatalogCategoryByIds(ids: Types.ObjectId[]): Promise<(Error | CatalogCategoryEntityDocument)[]> {
    return this.categoryByIds.loadMany(ids);
  }

  findCatalogCategoryBySlugs(slugs: string[]): Promise<(Error | CatalogCategoryEntityDocument)[]> {
    return this.categoryBySlugs.loadMany(slugs);
  }

  async findRelatedCategories(slugs: string | string[], limit = 10) {
    let words: string[] = []

    if(isString(slugs)) {
      words.push(slugs as string);
    }

    if(isArray(slugs)) {
      words = slugs as string[];
    }

    const tags = await this.catalogBigramModel.find({
      $or: [
        {
          word1: {
            $in: words
          }
        },
        {
          word2: {
            $in: words
          }
        },
      ]
    }, null, {
      sort: {
        count: -1
      },
      limit
    });

    const or = [];

    for(let i = 0; i < tags.length; i++) {
      if(or.indexOf(tags[i].word1) === -1 && words.indexOf(tags[i].word1) === -1) {
        or.push(tags[i].word1);
      }
      if(or.indexOf(tags[i].word2) === -1 && words.indexOf(tags[i].word2) === -1) {
        or.push(tags[i].word2);
      }
    }

    return or;
  }

  async findAllCatalogCategories(input: CursorPagingInput): Promise<CursorPagingResponse> {
    const {
      first,
      after,

      last,
      before,
    } = input;

    const basedQuery = {};

    const query: FilterQuery<CatalogCategoryEntityDocument> = Object.assign({}, basedQuery);

    const sort = {
      _id: 1
    };

    const limit = first || last;

    if(after) {
      query._id = {
        $gt: after
      };
    }

    if(before) {
      query._id = {
        $lt: before
      };
    }

    const edges = await this.catalogCategoryModel.find(query, null, {
      limit,
      sort
    });

    const endCursor = edges.length > 0 ? edges[edges.length - 1]._id : null;
    const startCursor = edges.length > 0 ? edges[0]._id : null;

    const hasNextPage = !!await this.catalogCategoryModel.findOne({
      _id: {
        $gt: endCursor
      }
    });

    const hasPreviousPage = !!await this.catalogCategoryModel.findOne({
      _id: {
        $lt: startCursor
      }
    });

    return {
      pageInfo: {
        hasNextPage,
        hasPreviousPage,
        endCursor,
        startCursor,
      },
      edges
    };
  }

  // create
  async createNewCategory({
    slug,
    label,
    parent,
    description
  }: CreateCategoryDto, skipError: boolean = false): Promise<CatalogCategoryEntityDocument | undefined> {
    const isFound = await this.catalogCategoryModel.findOne({
      slug
    });

    if(isFound && !skipError) {
      throw new UserInputError(`${slug} slug category is exists`, {
        invalidArgs: Object.keys({
          slug
        }),
      });
    }

    if(isFound && skipError) {
      return isFound;
    }

    const parentDocument = await this.catalogCategoryModel.findOne({
      _id: parent
    });

    const newCategory = new this.catalogCategoryModel();
    newCategory.slug = slug;
    newCategory.label = label;
    newCategory.parent = parent ? toObjectId(parent) : null;
    newCategory.level = parentDocument ? parentDocument.level + 1 : 0;
    newCategory.description = description || '';

    return await newCategory.save();
  }

  async createNewCustomCollection({
    slug,
    title,
    description,
    published
  }: CreateCustomCollectionDto): Promise<CatalogCustomCollectionEntityDocument | undefined> {
    const isFound = await this.catalogCustomCollectionModel.findOne({
      slug
    });

    if(isFound) {
      throw new UserInputError(`${slug} slug category is exists`, {
        invalidArgs: Object.keys({
          slug
        }),
      });
    }

    const newCustomCollection = new this.catalogCustomCollectionModel();
    newCustomCollection.slug = slug;
    newCustomCollection.title = title;
    newCustomCollection.description = description || '';
    newCustomCollection.published = published || false;

    return await newCustomCollection.save();
  }

  // update

  async updateCategoryIntoCustomCollection({
    category,
    collection,
    position
  }: UpdateCategoryCustomCollectionDto): Promise<CatalogCustomCollectionEntityDocument | undefined> {
    const isFoundCategory = await this.catalogCategoryModel.findOne(category);

    if(!isFoundCategory) {
      throw new UserInputError(`${category} category is not exists`, {
        invalidArgs: Object.keys({
          category
        }),
      });
    }

    const isFoundCollection = await this.catalogCustomCollectionModel.findOne(collection);

    if(!isFoundCollection) {
      throw new UserInputError(`${collection} collection is not exists`, {
        invalidArgs: Object.keys({
          collection
        }),
      });
    }

    if(!position) {
      position = isFoundCollection.categories.length + 1;
    }

    const isFoundElement = await this.catalogCustomCollectionModel.findOne({
      'categories.category': category
    });

    let result: CatalogCustomCollectionEntityDocument | null = null;

    if(isFoundElement) {
      // update position
      result = await this.catalogCustomCollectionModel.findOneAndUpdate({
        _id: collection,
        "categories.category": category
      }, {
        $set: {
          "categories.$.position": position
        }
      }, {
        new: true
      });
    } else {
      // add new document
      result = await this.catalogCustomCollectionModel.findOneAndUpdate({
        _id: collection
      }, {
        $push: {
          categories: {
            category,
            position
          }
        }
      }, {
        new: true
      });
    }

    return result;
  }
}
