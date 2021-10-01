import { Types } from 'mongoose';

export type CursorPagingInput = {
  first?: number;
  after?: Types.ObjectId,
  last?: number,
  before?: Types.ObjectId,
};

export type OffsetPagingInput = {
  first?: number;
  last?: number,
  offset?: number,
};
