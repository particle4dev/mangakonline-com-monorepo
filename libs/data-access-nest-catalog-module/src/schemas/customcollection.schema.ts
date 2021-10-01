import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Connection } from 'mongoose';
import { CatalogCustomCollectionEntityCollect, CatalogCustomCollectionEntityCollectSubSchema } from './collect.subschema';

export const CatalogCustomCollectionEntitySchemaName = 'catalog_custom_collection_entities';

export type CatalogCustomCollectionEntityDocument = CatalogCustomCollectionEntity & Document;

@Schema({
  timestamps: true
})
export class CatalogCustomCollectionEntity {
  // slug
  @Prop({
    require: true
  })
  slug: string;

  // title
  @Prop({
    require: true
  })
  title: string;

  @Prop({
    default: ''
  })
  description: string;

  @Prop({
    type: [CatalogCustomCollectionEntityCollectSubSchema],
    default: []
  })
  categories: CatalogCustomCollectionEntityCollect[];

  @Prop({
    default: false
  })
  published: boolean;
}

export const CatalogCustomCollectionEntitySchema = SchemaFactory.createForClass(CatalogCustomCollectionEntity);

let model = null;

export function initializeCatalogCustomCollectionEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(CatalogCustomCollectionEntitySchemaName, CatalogCustomCollectionEntitySchema);
  }
  return model;
}
