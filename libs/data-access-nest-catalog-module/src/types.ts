
import { Types } from 'mongoose';

export type { CatalogCategoryEntityDocument } from './schemas/category.schema';
export type { CatalogBigramEntityDocument } from './schemas/bigram.schema';
export type { CatalogCustomCollectionEntityDocument } from './schemas/customcollection.schema';

export type TCursorPagingInput = {
  first?: number;
  after?: Types.ObjectId,
  last?: number,
  before?: Types.ObjectId,
};

export type TCursorPagingPageInfoResponse = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  startCursor: string;
  endCursor: string;
};

export type TCursorPagingResponse<TNode> = Readonly<{
  edges: TNode[];
  pageInfo: TCursorPagingPageInfoResponse;
}>;
