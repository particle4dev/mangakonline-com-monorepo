import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';

export default class DeletePicturesDto {
  @IsNotEmpty()
  ids: Types.ObjectId[];
}
