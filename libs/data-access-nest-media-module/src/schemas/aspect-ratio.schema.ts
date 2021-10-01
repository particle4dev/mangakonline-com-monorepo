import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Connection } from 'mongoose';

export const MediaAspectRatioEntitySchemaName = 'media_aspect_ratio_entities';

export type MediaAspectRatioEntityDocument = MediaAspectRatioEntity & Document;

@Schema({
  timestamps: true
})
export class MediaAspectRatioEntity {
  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  text: string;
}

export const MediaAspectRatioEntitySchema = SchemaFactory.createForClass(MediaAspectRatioEntity);

let model = null;

export function initializeMediaAspectRatioEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(MediaAspectRatioEntitySchemaName, MediaAspectRatioEntitySchema);
  }
  return model;
}
