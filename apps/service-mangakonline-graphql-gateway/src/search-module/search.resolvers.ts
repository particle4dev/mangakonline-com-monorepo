// import { Types } from 'mongoose';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
import { SearchService } from './services';

@Resolver('SearchResultEntity')
export class SearchResolvers {

  constructor(
    private readonly mediaService: DataAccessMediaService,
  ) {}

  @Query('search')
  async findOneById(
    @Args('query') query: string,
    @Args('type') type: string,
    @Args('limit') limit: number,
    @Args('offset') offset: number,
  ): Promise<any> {
    const index = await SearchService.getOrCreateIndex('mangakonline-search');
    const options: any = {
      limit,
      offset,
    };

    if(type !== '') {
      options.filters = `type = ${type}`;
    }
    const result = await index.search(query, options);

    return {
      pageInfo: {
        limit,
        skip: offset,
        total: result.nbHits
      },
      edges: result.hits
    };
  }

  @ResolveField()
  cover(@Parent() search) {
    const { cover } = search;
    return this.mediaService.getPicture(cover);
  }


  @Mutation()
  async addNewDocument(@Args('input') input) {
    const index = await SearchService.getOrCreateIndex('mangakonline-search');
    await index.addDocuments([input]);

    return input;
  }

  @Mutation()
  async addNewDocuments(@Args('input') input) {
    const index = await SearchService.getOrCreateIndex('mangakonline-search');
    await index.addDocuments(input);

    return input;
  }
}
