import { Model, Types } from 'mongoose';
import DataLoader from 'dataloader';
import { hash } from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ROLES_ENUM_TYPE,
} from '@mp-workspace/data-access-constants';
import { __createUserByIdsLoader } from './loaders';
import { AuthUserEntityDocument, AuthUserEntitySchemaName } from './schemas/user.schema';
import UserRegisterDto from './dto/user-register.dto';

@Injectable()
export class DataAccessAuthService {
  private readonly userByIds: DataLoader<Types.ObjectId, AuthUserEntityDocument> | null

  constructor(
    @InjectModel(AuthUserEntitySchemaName)
    private readonly authUserModel: Model<AuthUserEntityDocument>
  ) {
    this.userByIds = __createUserByIdsLoader(this.authUserModel);
  }

  findOneByUsername(username: string): Promise<AuthUserEntityDocument | undefined> {
    return this.authUserModel.findOne({
      username
    }).exec();
  }

  findOne(_id: Types.ObjectId): Promise<AuthUserEntityDocument | undefined> {
    return this.userByIds.load(_id);
  }

  async createUser(input: UserRegisterDto): Promise<AuthUserEntityDocument | undefined> {
    const createdUser = new this.authUserModel();
    createdUser.username = input.username;
    createdUser.roles = [ROLES_ENUM_TYPE.USER];
    const bcrypt = await hashPassword(input.password);
    createdUser.services = {
      password: {
        bcrypt
      }
    };
    return createdUser.save();
  }
}

/**
 * Returns hashed password by hash password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @returns The hashed password mean of `password`
 *
 * @beta
 */
export const hashPassword = (password: string, salt = 10): Promise<string> => {
  return hash(password, salt);
};
