import { Model, Types } from 'mongoose';
import { toObjectId } from '@mp-workspace/utils-nest-parse-objectid-pipe';
import createLoader from './create-loader';
import { CatalogCategoryEntityDocument } from '../schemas/category.schema';

export const __createCategoryByIdsLoader = (categoriesModel: Model<CatalogCategoryEntityDocument>) => {
  const createCategoriesByIdsLoader = createLoader<Types.ObjectId, CatalogCategoryEntityDocument>(
    (data: CatalogCategoryEntityDocument) => data._id.toString(),
    (key: Types.ObjectId) => key.toString()
  );

  return createCategoriesByIdsLoader((ids: Types.ObjectId[]) => {
    return categoriesModel.find({
      _id: {
        $in: ids.map(toObjectId)
      }
    });
  });
};

export const __createCategoryBySlugsLoader = (categoriesModel: Model<CatalogCategoryEntityDocument>) => {
  const createCategoriesByIdsLoader = createLoader<string, CatalogCategoryEntityDocument>(
    'slug'
  );

  return createCategoriesByIdsLoader((slugs: string[]) => {
    return categoriesModel.find({
      slug: {
        $in: slugs
      }
    });
  });
};

export default () => {
  throw new Error(
    '⚠️ Do not import loaders directly, get them from the GraphQL context instead! ⚠️'
  );
};
