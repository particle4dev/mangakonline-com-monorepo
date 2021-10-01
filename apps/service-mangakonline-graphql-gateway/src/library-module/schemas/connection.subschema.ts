import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id : false
})
export class ConnectionEntity {
  @Prop({
    required: true,
  })
  url: string;
  @Prop({
    required: true,
  })
  id: string;
}

export const ConnectionEntitySubSchema = SchemaFactory.createForClass(ConnectionEntity);

