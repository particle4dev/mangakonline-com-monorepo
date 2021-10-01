import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Connection } from 'mongoose';
import { ConnectionEntity, ConnectionEntitySubSchema } from './connection.subschema';

export const LibraryBookEntitySchemaName = 'library_book_entities';

export type LibraryBookEntityDocument = LibraryBookEntity & Document & {
  createdAt: Date,
  updatedAt: Date,
};

@Schema({
  timestamps: true
})
export class LibraryBookEntity {
  @Prop({
    index: true
  })
  slug: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  cover: Types.ObjectId;

  @Prop({
    default : 0
  })
  totalChapters: number;

  @Prop({
    default: []
  })
  categories: Types.ObjectId[];

  @Prop({ type: [ConnectionEntitySubSchema], default: [] })
  connections: ConnectionEntity[];
}

export const LibraryBookEntitySchema = SchemaFactory.createForClass(LibraryBookEntity);

LibraryBookEntitySchema.index({ "connections.url": 1 }, { unique: true });

LibraryBookEntitySchema.index({ "createdAt": 1 });

LibraryBookEntitySchema.index({ "updatedAt": 1 });

let model = null;

export function initializeLibraryBookEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(LibraryBookEntitySchemaName, LibraryBookEntitySchema);
  }
  return model;
}
