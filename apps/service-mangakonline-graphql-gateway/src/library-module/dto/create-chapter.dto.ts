import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';
import {
  CreateNewChapterInput
} from '../../graphql.schema';

export default class CreateChapterDto extends CreateNewChapterInput {
  @IsNotEmpty()
  book: Types.ObjectId;

  slug: string;

  title: string;

  images: Types.ObjectId[];
}
