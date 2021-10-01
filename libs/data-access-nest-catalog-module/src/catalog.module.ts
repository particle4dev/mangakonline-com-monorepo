import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessCatalogService } from './catalog.service';
import {
  CatalogBigramEntitySchemaName,
  CatalogBigramEntitySchema
} from './schemas/bigram.schema';
import {
  CatalogCategoryEntitySchemaName,
  CatalogCategoryEntitySchema
} from './schemas/category.schema';
import {
  CatalogCustomCollectionEntitySchemaName,
  CatalogCustomCollectionEntitySchema
} from './schemas/customcollection.schema';
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
      name: CatalogBigramEntitySchemaName,
      schema: CatalogBigramEntitySchema
    }, {
      name: CatalogCategoryEntitySchemaName,
      schema: CatalogCategoryEntitySchema
    }, {
      name: CatalogCustomCollectionEntitySchemaName,
      schema: CatalogCustomCollectionEntitySchema
    }], MODULE_CONNECTION_NAME),
  ],
  providers: [DataAccessCatalogService],
  exports: [DataAccessCatalogService],
})
export class DataAccessCatalogModule {}
