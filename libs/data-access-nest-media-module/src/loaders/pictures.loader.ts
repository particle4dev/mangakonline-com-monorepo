import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
import { MediaPictureEntityDocument } from '../schemas/picture.schema';

export const __createPictureByIdsLoader = (picturesModel: Model<MediaPictureEntityDocument>) => {
  return new DataLoader(async (ids: Types.ObjectId[]) => {
    const res = await picturesModel.find({
      _id: {
        $in: ids
      }
    });

    return ids.map(id => res.find((e: MediaPictureEntityDocument) => e._id.equals(id)));
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
