import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Connection, SchemaTypes } from 'mongoose';
import { TASK_STATUS_TYPE } from '../constants';

export const CrawlingTaskEntitySchemaName = 'crawling_task_entities';

export type CrawlingTaskEntityDocument = CrawlingTaskEntity & Document & {
  createdAt: Date,
  updatedAt: Date,
};

@Schema({
  timestamps: true,
  minimize: false
})
export class CrawlingTaskEntity {
  @Prop()
  link: string;

  @Prop()
  host: string;

  @Prop({
    type: String,
    enum: TASK_STATUS_TYPE,
    default: TASK_STATUS_TYPE.NEW
  })
  status: TASK_STATUS_TYPE;

  // fix(): fallback to mixed type when no type specified
  @Prop({
    type: SchemaTypes.Mixed,
    default: {}
  })
  payload: Record<string, string>;
}

export const CrawlingTaskEntitySchema = SchemaFactory.createForClass(CrawlingTaskEntity);

let model = null;

export function initializeCrawlingTaskEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(CrawlingTaskEntitySchemaName, CrawlingTaskEntitySchema);
  }
  return model;
}
