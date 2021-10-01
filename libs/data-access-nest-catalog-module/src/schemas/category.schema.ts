import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document, Connection } from 'mongoose';
import {
  STATUS_ENUM_TYPE,
} from '@mp-workspace/data-access-constants';

export const CatalogCategoryEntitySchemaName = 'catalog_category_entities';

export type CatalogCategoryEntityDocument = CatalogCategoryEntity & Document;

@Schema({
  timestamps: true
})
export class CatalogCategoryEntity {
  // slug, sử dụng cho url thay cho SEO
  @Prop({
    index: true
  })
  slug: string;

  // Tên
  @Prop()
  label: string;

  // đánh dấu vị trí của Category trong 1 level
  // không có giá trị khi so sánh weight của 2 category trong 2 level khác nhau
  // for sort
  // Tên
  @Prop({
    default: 0
  })
  weight: number;

  // category cha
  @Prop({
    default: null
  })
  parent: Types.ObjectId;

  // ảnh đại diện cho category
  @Prop()
  images: Types.ObjectId[];

  // độ xâu của category, luôn bằng cha + 1
  @Prop({
    default: 0
  })
  level: number;

  // mô tả về category
  @Prop({
    default: ''
  })
  description: string;

  // trạng thái của category
  @Prop({
    type: String,
    enum: STATUS_ENUM_TYPE,
    default: STATUS_ENUM_TYPE.ACTIVE
  })
  status: STATUS_ENUM_TYPE;
}

export const CatalogCategoryEntitySchema = SchemaFactory.createForClass(CatalogCategoryEntity);

let model = null;

export function initializeCatalogCategoryEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(CatalogCategoryEntitySchemaName, CatalogCategoryEntitySchema);
  }
  return model;
}
