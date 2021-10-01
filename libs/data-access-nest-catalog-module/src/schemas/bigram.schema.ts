import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Connection } from 'mongoose';

export const CatalogBigramEntitySchemaName = 'catalog_bigram_entities';

export type CatalogBigramEntityDocument = CatalogBigramEntity & Document;

@Schema({
  timestamps: true
})
export class CatalogBigramEntity {
  // slug 1
  @Prop({
    require: true
  })
  word1: string;

  // slug 2
  @Prop({
    require: true
  })
  word2: string;

  // số lần mà word1 và word2 đi cạnh nhau
  @Prop({
    default: 1
  })
  count: number;
}

export const CatalogBigramEntitySchema = SchemaFactory.createForClass(CatalogBigramEntity);

// indexes
CatalogBigramEntitySchema.index({ word1: 1 });
CatalogBigramEntitySchema.index({ word2: 1 });

let model = null;

export function initializeCatalogBigramEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(CatalogBigramEntitySchemaName, CatalogBigramEntitySchema);
  }
  return model;
}
