import { Types } from 'mongoose';
import {
  IsNotEmpty
} from 'class-validator';
import {
  CreateNewBookInput
} from '../../graphql.schema';

export default class CreateBookDto extends CreateNewBookInput {
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  cover: Types.ObjectId;

  description: string;
}
