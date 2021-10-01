import DataLoader from 'dataloader';
import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import getFilename from '@mp-workspace/util-penguin-ui-get-filename';
import aspectRatio from '@mp-workspace/util-penguin-ui-aspect-ratio';
import { getImageSize } from './utils';
import { MediaAspectRatioEntityDocument, MediaAspectRatioEntitySchemaName } from './schemas/aspect-ratio.schema';
import { MediaPictureEntityDocument, MediaPictureEntitySchemaName } from './schemas/picture.schema';
import { __createPictureByIdsLoader, __createAspectRatioByIdsLoader } from './loaders';
import {
  AddNewPictureURLDto,
  AddNewAspectRatioDto,
  DeletePictureDto,
  DeletePicturesDto
} from './dto';

@Injectable()
export class DataAccessMediaService {
  private readonly pictureByIds: DataLoader<Types.ObjectId, MediaPictureEntityDocument> | null
  private readonly aspectRatioByIds: DataLoader<Types.ObjectId, MediaAspectRatioEntityDocument> | null

  constructor(
    @InjectModel(MediaAspectRatioEntitySchemaName)
    private readonly aspectRatioModel: Model<MediaAspectRatioEntityDocument>,
    @InjectModel(MediaPictureEntitySchemaName)
    private readonly pictureModel: Model<MediaPictureEntityDocument>
  ) {
    this.pictureByIds = __createPictureByIdsLoader(this.pictureModel);
    this.aspectRatioByIds = __createAspectRatioByIdsLoader(this.aspectRatioModel);
  }

  // Get a single picture
  getPicture(id: Types.ObjectId): Promise<MediaPictureEntityDocument> {
    return this.pictureByIds.load(id);
  }

  // Get many picture
  getPictures(ids: Types.ObjectId[]): Promise<(Error | MediaPictureEntityDocument)[]> {
    return this.pictureByIds.loadMany(ids);
  }

  // Get a single aspect ratio
  getAspectRatio(_id: Types.ObjectId): Promise<MediaAspectRatioEntityDocument> {
    return this.aspectRatioByIds.load(_id);
  }

  // Get aspect ratios
  getAspectRatios(_ids: Types.ObjectId[]): Promise<(Error | MediaAspectRatioEntityDocument)[]>  {
    return this.aspectRatioByIds.loadMany(_ids);
  }

  async upsertNewAspectRatio({ width, height }: AddNewAspectRatioDto): Promise<MediaAspectRatioEntityDocument | undefined> {
    const text = `${width}:${height}`;
    const isFound = await this.aspectRatioModel.findOne({
      text
    });
    if(isFound) {
      return isFound;
    }

    const aspectRatio = new this.aspectRatioModel();
    aspectRatio.width = width;
    aspectRatio.height = height;
    aspectRatio.text = text;

    return aspectRatio.save();
  }

  async addNewPictureURL({ url, alt }: AddNewPictureURLDto): Promise<MediaPictureEntityDocument | undefined> {
    const isFound = await this.pictureModel.findOne({
      'sizes.url': url
    });
    if(isFound) {
      return isFound;
    }

    const filename = getFilename(url);

    const size: any = await getImageSize(url);
    // url is error
    if(!size) {
      return undefined;
    }

    const {width, height} = size;
    const sizes = [{
      ...size,
      url
    }];
    const [ratioWidth, ratioHeight] = aspectRatio(width/height);
    const ar = await this.upsertNewAspectRatio({
      width: ratioWidth,
      height: ratioHeight
    });
    const picture = new this.pictureModel();

    picture.filename = filename;
    picture.alt = alt || filename;
    picture.aspectRatio = ar._id;
    picture.sizes = sizes;

    return picture.save();
  }

  async deletePicture({ id }: DeletePictureDto): Promise<MediaPictureEntityDocument | undefined> {
    return this.pictureModel.findOneAndRemove({
      _id: id
    }).exec();
  }

  async deletePictures({ ids }: DeletePicturesDto): Promise<Types.ObjectId[] | undefined> {
    const pictures = await this.pictureModel.find({
      _id: ids
    });

    const result = pictures.map(p => p._id);
    await this.pictureModel.deleteMany({
      _id: result
    });
    return result;
  }
}
