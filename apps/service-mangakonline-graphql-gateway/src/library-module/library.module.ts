// import * as mongoose from 'mongoose';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessMediaModule } from '@mp-workspace/data-access-nest-media-module';
import { DataAccessCatalogModule } from '@mp-workspace/data-access-nest-catalog-module';
import { LibraryService } from './library.service';
import { BookResolver } from './book.resolver';
import { ChapterResolver } from './chapter.resolver';
import {
  LibraryBookEntitySchemaName,
  LibraryBookEntitySchema
} from './schemas/book.schema';
import {
  LibraryChapterEntitySchemaName,
  LibraryChapterEntitySchema
} from './schemas/chapter.schema';
import { MODULE_CONNECTION_NAME } from './constants';

// mongoose.set('useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true);

@Module({
  imports: [
    DataAccessMediaModule,
    DataAccessCatalogModule,
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
      connectionName: MODULE_CONNECTION_NAME
    }),
    MongooseModule.forFeature([{
      name: LibraryBookEntitySchemaName,
      schema: LibraryBookEntitySchema
    }, {
      name: LibraryChapterEntitySchemaName,
      schema: LibraryChapterEntitySchema
    }], MODULE_CONNECTION_NAME),
  ],
  providers: [LibraryService, BookResolver, ChapterResolver],
  exports: [LibraryService],
})
export class LibraryModule {}
