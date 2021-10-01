import { Model, Types } from 'mongoose';
import { toObjectId } from '@mp-workspace/utils-nest-parse-objectid-pipe';
import createLoader from './create-loader';
import { CatalogCustomCollectionEntityDocument } from '../schemas/customcollection.schema';

export const __createCustomCollectionByIdsLoader = (customCollectionsModel: Model<CatalogCustomCollectionEntityDocument>) => {
  const createCustomCollectionByIdsLoader = createLoader<Types.ObjectId, CatalogCustomCollectionEntityDocument>(
    (data: CatalogCustomCollectionEntityDocument) => data._id.toString(),
    (key: Types.ObjectId) => key.toString()
  );

  return createCustomCollectionByIdsLoader((ids: Types.ObjectId[]) => {
    return customCollectionsModel.find({
      _id: {
        $in: ids.map(toObjectId)
      }
    });
  });
};

export const __createCustomCollectionBySlugsLoader = (customCollectionsModel: Model<CatalogCustomCollectionEntityDocument>) => {
  const createCustomCollectionByIdsLoader = createLoader<string, CatalogCustomCollectionEntityDocument>(
    'slug'
  );

  return createCustomCollectionByIdsLoader((slugs: string[]) => {
    return customCollectionsModel.find({
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
