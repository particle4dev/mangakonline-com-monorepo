import { Module } from '@nestjs/common';
import { PictureResolvers } from './picture.resolvers';
import { DataAccessMediaModule } from '@mp-workspace/data-access-nest-media-module';

@Module({
  imports: [
    DataAccessMediaModule,
  ],
  providers: [PictureResolvers],
  exports: [],
})
export class MediaModule {}
