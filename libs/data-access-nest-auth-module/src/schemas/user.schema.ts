import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Connection } from 'mongoose';
import {
  ROLES_ENUM_TYPE,
  STATUS_ENUM_TYPE
} from '@mp-workspace/data-access-constants';
import { AuthUserEmailEntity, AuthUserEmailEntitySubSchema } from './email.subschema';
import { AuthUserProfileEntity, AuthUserProfileEntitySubSchema } from './profile.subschema';
import { AuthUserServiceEntity, AuthUserServiceEntitySubSchema } from './service.subschema';

export const AuthUserEntitySchemaName = 'auth_user_entities';

export type AuthUserEntityDocument = AuthUserEntity & Document;

@Schema({
  timestamps: true
})
export class AuthUserEntity {
  @Prop({
    index: true
  })
  username: string;

  @Prop({
    type: [AuthUserEmailEntitySubSchema],
    default: []
  })
  emails: AuthUserEmailEntity[];

  @Prop({
    type: AuthUserProfileEntitySubSchema,
    default: {}
  })
  profile: AuthUserProfileEntity;

  @Prop({
    type: AuthUserServiceEntitySubSchema,
    default: {}
  })
  services: AuthUserServiceEntity;

  @Prop({
    type: [String],
    enum: ROLES_ENUM_TYPE,
    default: [ROLES_ENUM_TYPE.USER],
  })
  roles: ROLES_ENUM_TYPE[];

  @Prop({
    type: String,
    enum: STATUS_ENUM_TYPE,
    default: STATUS_ENUM_TYPE.ACTIVE
  })
  status: STATUS_ENUM_TYPE;
}

export const AuthUserEntitySchema = SchemaFactory.createForClass(AuthUserEntity);

let model = null;

export function initializeAuthUserEntityModel(dbConnection: Connection) {
  if (!model) {
    model = dbConnection.model(AuthUserEntitySchemaName, AuthUserEntitySchema);
  }
  return model;
}
