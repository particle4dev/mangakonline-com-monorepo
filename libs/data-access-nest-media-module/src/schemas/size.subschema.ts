import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id : false
})
export class SizeEntity {
  @Prop()
  url: string;

  // @Prop()
  // orientation: number;

  @Prop()
  width: number;

  @Prop()
  height: number;

  @Prop()
  type: string;
}

export const SizeEntitySubSchema = SchemaFactory.createForClass(SizeEntity);
