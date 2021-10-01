import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
import { AuthUserEntityDocument } from '../schemas/user.schema';

export const __createUserByIdsLoader = (usersModel: Model<AuthUserEntityDocument>) => {
  return new DataLoader(async (ids: Types.ObjectId[]) => {
    const res = await usersModel.find({
      _id: {
        $in: ids
      }
    });
    return ids.map(id => res.find((e: AuthUserEntityDocument) => e._id.equals(id)));
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
