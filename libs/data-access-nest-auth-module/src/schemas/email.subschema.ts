import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id : false
})
export class AuthUserEmailEntity {
  @Prop()
  address: string;

  @Prop()
  verified: boolean;
}

export const AuthUserEmailEntitySubSchema = SchemaFactory.createForClass(AuthUserEmailEntity);
