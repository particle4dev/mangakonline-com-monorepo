import { Module } from '@nestjs/common';
import { DataAccessCatalogModule } from '@mp-workspace/data-access-nest-catalog-module';
import { DataAccessMediaModule } from '@mp-workspace/data-access-nest-media-module';
import { CategoryResolver } from './category.resolver';

@Module({
  imports: [
    DataAccessCatalogModule,
    DataAccessMediaModule
  ],
  providers: [CategoryResolver],
  exports: [],
})
export class CatalogModule {}
