import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types, Connection } from 'mongoose';
import { MediaAspectRatioEntity, MediaAspectRatioEntitySchemaName } from './aspect-ratio.schema';
import { SizeEntity, SizeEntitySubSchema } from './size.subschema';

export const MediaPictureEntitySchemaName = 'media_picture_entities';

export type MediaPictureEntityDocument = Omit<MediaPictureEntity, 'aspectRatio'> & Document & {
  aspectRatio: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

@Schema({
  timestamps: true
})
export class MediaPictureEntity {
  @Prop()
  filename: string;

  @Prop()
  alt: string;

  @Prop({ type: Types.ObjectId, ref: MediaAspectRatioEntitySchemaName })
  aspectRatio: MediaAspectRatioEntity;

  @Prop({type: [SizeEntitySubSchema]})
  sizes: SizeEntity[];
}

export const MediaPictureEntitySchema = SchemaFactory.createForClass(MediaPictureEntity);

let model = null;

export function initializeMediaPictureEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(MediaPictureEntitySchemaName, MediaPictureEntitySchema);
  }
  return model;
}
