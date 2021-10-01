import DataLoader from 'dataloader';
import { Model, Types } from 'mongoose';
import { LibraryBookEntityDocument } from '../schemas/book.schema';

export const __createBookByIdsLoader = (booksModel: Model<LibraryBookEntityDocument>) => {
  return new DataLoader(async (ids: Types.ObjectId[]) => {
    const res = await booksModel.find({
      _id: {
        $in: ids
      }
    });

    return ids.map(id => res.find((e: LibraryBookEntityDocument) => e._id.equals(id)));
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
