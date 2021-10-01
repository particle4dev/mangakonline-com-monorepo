import { Module } from '@nestjs/common';
import { DataAccessAuthModule } from '@mp-workspace/data-access-nest-auth-module';
import { UserResolver } from './user.resolver';

@Module({
  imports: [
    DataAccessAuthModule,
  ],
  providers: [UserResolver],
  exports: [],
})
export class UsersModule {}
