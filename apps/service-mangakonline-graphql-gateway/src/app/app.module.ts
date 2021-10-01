
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth-module/auth.module';
import { CatalogModule } from '../catalog-module/catalog.module';
import { GlobalModule } from '../global-module/global.module';
import { GraphqlModule } from '../graphql-module/graphql.module';
import { LibraryModule } from '../library-module/library.module';
import { MediaModule } from '../media-module/media.module';
import { SearchModule } from '../search-module/search.module';
import { ReviewsModule } from '../reviews-module/reviews.module';
import { UsersModule } from '../users-module/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SetResolver } from './set.resolver';

@Module({
  imports: [
    AuthModule,
    GlobalModule,
    GraphqlModule,
    MediaModule,
    SearchModule,
    CatalogModule,
    LibraryModule,
    ReviewsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, SetResolver],
})

export class AppModule {}
