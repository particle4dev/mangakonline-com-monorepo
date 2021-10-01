import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  GENDER_ENUM_TYPE
} from '@mp-workspace/data-access-constants';

@Schema({
  _id : false
})
export class AuthUserProfileEntity {
  @Prop()
  fullname: string;

  @Prop({
    type: String,
    enum: GENDER_ENUM_TYPE,
    default: GENDER_ENUM_TYPE.MALE
  })
  gender: GENDER_ENUM_TYPE;
}

export const AuthUserProfileEntitySubSchema = SchemaFactory.createForClass(AuthUserProfileEntity);
