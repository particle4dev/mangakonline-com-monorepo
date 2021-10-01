import { Module } from '@nestjs/common';
import { DataAccessMediaModule } from '@mp-workspace/data-access-nest-media-module';
import { SearchResolvers } from './search.resolvers';

@Module({
  imports: [
    DataAccessMediaModule
  ],
  providers: [SearchResolvers],
  exports: [],
})
export class SearchModule {}
