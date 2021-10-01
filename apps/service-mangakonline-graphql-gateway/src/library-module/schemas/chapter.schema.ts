import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Connection } from 'mongoose';
import { ConnectionEntity, ConnectionEntitySubSchema } from './connection.subschema';

export const LibraryChapterEntitySchemaName = 'library_chapter_entities';

export type LibraryChapterEntityDocument = LibraryChapterEntity & Document;

@Schema({
  timestamps: true
})
export class LibraryChapterEntity {
  // slug, sử dụng cho url thay cho SEO
  @Prop({
    index: true
  })
  slug: string;

  @Prop()
  title: string;

  @Prop()
  book: Types.ObjectId;

  @Prop({
    index: true
  })
  number: number;

  @Prop({
    index: true
  })
  releaseDate: Date;

  @Prop()
  cover: Types.ObjectId;

  @Prop()
  images: Types.ObjectId[];

  @Prop({ type: [ConnectionEntitySubSchema], default: [] })
  connections: ConnectionEntity[];
}

export const LibraryChapterEntitySchema = SchemaFactory.createForClass(LibraryChapterEntity);

LibraryChapterEntitySchema.index({ "connections.url": 1 }, { unique: true });

let model = null;

export function initializeLibraryChapterEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(LibraryChapterEntitySchemaName, LibraryChapterEntitySchema);
  }
  return model;
}
