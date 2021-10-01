import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  _id : false
})
export class AuthUserEntityServicePassword {
  @Prop()
  bcrypt: string;
}

export const AuthUserEntityServicePasswordSubSchema = SchemaFactory.createForClass(AuthUserEntityServicePassword);

@Schema({
  _id : false
})
export class AuthUserServiceEntity {
  @Prop({ type: AuthUserEntityServicePasswordSubSchema })
  password: AuthUserEntityServicePassword;
}

export const AuthUserServiceEntitySubSchema = SchemaFactory.createForClass(AuthUserServiceEntity);
