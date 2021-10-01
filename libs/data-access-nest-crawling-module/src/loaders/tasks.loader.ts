import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
import { CrawlingTaskEntityDocument } from '../schemas/task.schema';

export const __createTaskByIdsLoader = (tasksModel: Model<CrawlingTaskEntityDocument>) => {
  return new DataLoader(async (ids: Types.ObjectId[]) => {
    const res = await tasksModel.find({
      _id: {
        $in: ids
      }
    });

    return ids.map(id => res.find((e: CrawlingTaskEntityDocument) => e._id.equals(id)));
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
