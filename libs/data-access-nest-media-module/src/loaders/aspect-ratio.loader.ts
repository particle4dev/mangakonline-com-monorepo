import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
import { MediaAspectRatioEntityDocument } from '../schemas/aspect-ratio.schema';

export const __createAspectRatioByIdsLoader = (aspectRatiosModel: Model<MediaAspectRatioEntityDocument>) => {
  return new DataLoader(async (ids: Types.ObjectId[]) => {
    const res = await aspectRatiosModel.find({
      _id: {
        $in: ids
      }
    });

    return ids.map(id => res.find((e: MediaAspectRatioEntityDocument) => e._id.equals(id)));
  }, {
    cacheKeyFn: (key: Types.ObjectId) => {
      return key.toString();
    }
  });
};

export default () => {
  throw new Error(
    '⚠️ Do not import loaders directly, get them from the GraphQL context instead! ⚠️'
  );
};
