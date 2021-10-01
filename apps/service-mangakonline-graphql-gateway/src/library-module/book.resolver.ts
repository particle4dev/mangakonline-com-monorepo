import { Types } from 'mongoose';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
import ParseObjectIdPipe from '@mp-workspace/utils-nest-parse-objectid-pipe';
import { DataAccessCatalogService } from '@mp-workspace/data-access-nest-catalog-module';
import { BookOrder } from '../graphql.schema';
import {
  CreateBookDto,
  DeleteBookDto
} from './dto';
import type { LibraryBookEntityDocument } from './schemas/book.schema';
import { LibraryService } from './library.service';

@Resolver('LibraryBookEntity')
export class BookResolver {
  constructor(
    private readonly libraryService: LibraryService,
    private readonly catalogService: DataAccessCatalogService,
    private readonly mediaService: DataAccessMediaService,
  ) {}

  @Query('books')
  books(
    @Args('first') first: number,
    @Args('after') after: string,

    @Args('last') last: number,
    @Args('before') before: string,
    @Args('orderBy') orderBy: BookOrder,
  ) {
    return this.libraryService.findAllLibraryBooks({
      first,
      after,
      last,
      before,
      orderBy
    });
  }

  @Query('book')
  findBookById(
    @Args('_id', ParseObjectIdPipe)
      _id: Types.ObjectId,
  ): Promise<LibraryBookEntityDocument> {
    return this.libraryService.findLibraryBook(_id);
  }

  @Query('findBookBySlug')
  findBookBySlug(
    @Args('slug')
      slug: string,
  ): Promise<LibraryBookEntityDocument> {
    return this.libraryService.findLibraryBookBySlug(slug);
  }

  @Query('findBookByCategory')
  findBookByCategory(
    @Args('first') first: number,
    @Args('after', ParseObjectIdPipe) after: Types.ObjectId,

    @Args('last') last: number,
    @Args('before', ParseObjectIdPipe) before: Types.ObjectId,

    @Args('category') category: string,
  ) {
    return this.libraryService.findAllLibraryBookByCategory({
      first,
      after,
      last,
      before,
      category,
    });
  }

  @ResolveField()
  cover(@Parent() book: LibraryBookEntityDocument) {
    const { cover } = book;
    return this.mediaService.getPicture(cover);
  }

  @ResolveField()
  relatedBooks(@Parent() book: LibraryBookEntityDocument) {
    const { _id } = book;
    return this.libraryService.findRelatedBooks(_id);
  }

  @ResolveField()
  categories(@Parent() book: LibraryBookEntityDocument) {
    const { categories } = book;
    return this.catalogService.findCatalogCategoryByIds(categories);
  }

  @Mutation()
  async createNewBook(@Args('input') input: CreateBookDto, @Args('skipError') skipError = false) {
    const book = await this.libraryService.createNewBook(input, skipError);
    return {
      book
    };
  }

  @Mutation()
  async deleteBook(@Args('input') input: DeleteBookDto) {
    const _id = await this.libraryService.deleteBook(input.slug);

    return {
      _id
    };
  }
}
