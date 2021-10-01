import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';

export default class CreateCategoryDto {
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  label: string;

  parent?: Types.ObjectId | string;

  description?: string;
}
