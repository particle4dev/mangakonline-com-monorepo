import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';

export default class DeletePictureDto {
  @IsNotEmpty()
  id: Types.ObjectId;
}
