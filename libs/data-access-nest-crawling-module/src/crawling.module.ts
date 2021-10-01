import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessCrawlingService } from './crawling.service';
import { CrawlingTaskEntitySchemaName, CrawlingTaskEntitySchema } from './schemas/task.schema';
import { MODULE_CONNECTION_NAME } from './constants';

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
      name: CrawlingTaskEntitySchemaName,
      schema: CrawlingTaskEntitySchema
    }], MODULE_CONNECTION_NAME),
  ],
  providers: [DataAccessCrawlingService],
  exports: [DataAccessCrawlingService],
})
export class DataAccessCrawlingModule {}
