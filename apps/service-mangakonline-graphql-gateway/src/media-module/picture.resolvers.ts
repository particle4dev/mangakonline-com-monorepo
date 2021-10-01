import { Types } from 'mongoose';
import { Args, Query, Resolver, ResolveField, Parent, Mutation } from '@nestjs/graphql';
import { DataAccessMediaService, AddNewPictureURLDto, DeletePictureDto, DeletePicturesDto } from '@mp-workspace/data-access-nest-media-module';
import type { MediaPictureEntityDocument } from '@mp-workspace/data-access-nest-media-module';
import ParseObjectIdPipe from '@mp-workspace/utils-nest-parse-objectid-pipe';
import type { MediaPictureEntity, DeletePicturePayload, DeletePicturesPayload } from '../graphql.schema';

type DeletePicturesResponse = Omit<DeletePicturesPayload, '_ids'> & {
  _ids: Types.ObjectId[]
};

@Resolver('MediaPictureEntity')
export class PictureResolvers {
  constructor(private readonly mediaService: DataAccessMediaService) {}

  @Query('picture')
  async findOneById(
    @Args('_id', ParseObjectIdPipe)
      _id: Types.ObjectId,
  ): Promise<MediaPictureEntityDocument> {
    return this.mediaService.getPicture(_id);
  }

  @ResolveField()
  async findSize(
    @Parent() picture: MediaPictureEntity,
    // @Args('type') type: string
  ) {
    return picture.sizes[0];
  }

  @ResolveField()
  async aspectRatio(
    @Parent() picture,
  ) {
    return this.mediaService.getAspectRatio(picture.aspectRatio);
  }

  @Mutation()
  async addNewPictureURL(@Args('input') input: AddNewPictureURLDto) {
    const picture = await this.mediaService.addNewPictureURL(input);
    return {
      picture
    };
  }

  @Mutation()
  async addNewPicturesURL(@Args('input') input: AddNewPictureURLDto[]) {
    const pictures = [];
    for(let i = 0; i < input.length; i += 1) {
      const picture = await this.mediaService.addNewPictureURL(input[i]);
      pictures.push(picture);
    }
    return {
      pictures
    };
  }

  @Mutation()
  async deletePicture(@Args('input') input: DeletePictureDto): Promise<DeletePicturePayload> {
    const picture = await this.mediaService.deletePicture(input);

    // FIXME: should we throw an error when not found picture
    if(picture)
      return {
        _id: picture._id
      };
    return {
      _id: null
    };
  }

  @Mutation()
  async deletePictures(@Args('input') input: DeletePicturesDto): Promise<DeletePicturesResponse | undefined> {
    const pictures = await this.mediaService.deletePictures(input);
    return {
      _ids: pictures
    };
  }
}
