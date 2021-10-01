import { Types } from 'mongoose';
import { Args, Query, Resolver, Context } from '@nestjs/graphql';
import { DataAccessAuthService, AuthUserEntityDocument } from '@mp-workspace/data-access-nest-auth-module';
import ParseObjectIdPipe from '@mp-workspace/utils-nest-parse-objectid-pipe';
import type { AuthUserEntity } from '../graphql.schema';

@Resolver('AuthUserEntity')
export class UserResolver {
  constructor(private readonly usersService: DataAccessAuthService) {}

  @Query('user')
  findCategoryById(
    @Args('_id', ParseObjectIdPipe)
      _id: Types.ObjectId,
  ): Promise<AuthUserEntityDocument> {
    return this.usersService.findOne(_id);
  }

  @Query('me')
  async me(@Context('currentUser') currentUser: AuthUserEntity): Promise<AuthUserEntityDocument> {
    return this.usersService.findOneByUsername(currentUser.username);
  }
}
