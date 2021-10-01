import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MODULE_CONNECTION_NAME } from './constants';
import { DataAccessAuthService } from './users.service';
import { AuthUserEntitySchemaName, AuthUserEntitySchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
      connectionName: MODULE_CONNECTION_NAME
    }),
    MongooseModule.forFeature([{
      name: AuthUserEntitySchemaName,
      schema: AuthUserEntitySchema
    }], MODULE_CONNECTION_NAME),
  ],
  providers: [DataAccessAuthService],
  exports: [DataAccessAuthService],
})
export class DataAccessAuthModule {}
