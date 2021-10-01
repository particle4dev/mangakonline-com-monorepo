import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';

export default class UpdateCategoryCustomCollectionDto {
  // @IsNotEmpty()
  // category: Types.ObjectId;

  // @IsNotEmpty()
  // collection: Types.ObjectId;

  // position?: number;

  @IsNotEmpty()
  category: any;

  @IsNotEmpty()
  collection: any;

  position?: any;
}
