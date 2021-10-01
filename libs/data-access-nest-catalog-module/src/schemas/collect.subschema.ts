import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({})
export class CatalogCustomCollectionEntityCollect {
  @Prop()
  category: Types.ObjectId;

  @Prop({
    default: 0
  })
  position: number;
}

export const CatalogCustomCollectionEntityCollectSubSchema = SchemaFactory.createForClass(CatalogCustomCollectionEntityCollect);
