import { Types } from 'mongoose';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { DataAccessCatalogService, CreateCategoryDto } from '@mp-workspace/data-access-nest-catalog-module';
import type { CatalogCategoryEntityDocument } from '@mp-workspace/data-access-nest-catalog-module';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
import ParseObjectIdPipe, { toObjectId } from '@mp-workspace/utils-nest-parse-objectid-pipe';

@Resolver('CatalogCategoryEntity')
export class CategoryResolver {
  constructor(
    private readonly catalogService: DataAccessCatalogService,
    private readonly mediaService: DataAccessMediaService,
  ) {}

  @Query('categories')
  categories(
    @Args('first') first: number,
    @Args('after', ParseObjectIdPipe) after: Types.ObjectId,

    @Args('last') last: number,
    @Args('before', ParseObjectIdPipe) before: Types.ObjectId,
  ) {
    return this.catalogService.findAllCatalogCategories({
      first,
      after,
      last,
      before,
    });
  }

  @Query('category')
  findCategoryById(
    @Args('_id', ParseObjectIdPipe)
      _id: Types.ObjectId,
  ): Promise<CatalogCategoryEntityDocument> {
    return this.catalogService.findCatalogCategoryById(_id);
  }

  @Query('findCategoryByLabel')
  findCategoryByLabel(
    @Args('label') label: string,
  ): Promise<CatalogCategoryEntityDocument> {
    return this.catalogService.findCatalogCategoryByLabel(label);
  }

  @Query('findCategoryBySlug')
  findCategoryBySlug(
    @Args('slug') slug: string,
  ): Promise<CatalogCategoryEntityDocument> {
    return this.catalogService.findCatalogCategoryBySlug(slug);
  }

  @Query('findCategoriesByIds')
  findCategoriesByIds(
    @Args('ids') ids: string[],
  ): Promise<(Error | CatalogCategoryEntityDocument)[]> {
    const i = ids.map(toObjectId);
    return this.catalogService.findCatalogCategoryByIds(i);
  }

  @ResolveField()
  images(@Parent() category: CatalogCategoryEntityDocument) {
    const { images } = category;
    return this.mediaService.getPictures(images);
  }

  @Mutation()
  async createNewCategory(@Args('input') input: CreateCategoryDto, @Args('skipError') skipError = false) {
    const category = await this.catalogService.createNewCategory(input, skipError);
    return {
      category
    };
  }
}
