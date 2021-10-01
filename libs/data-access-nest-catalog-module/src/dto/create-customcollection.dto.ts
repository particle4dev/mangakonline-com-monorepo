import {
  IsNotEmpty
} from 'class-validator';

export default class CreateCustomCollectionDto {
  @IsNotEmpty()
  slug: string;

  @IsNotEmpty()
  title: string;

  description?: string;

  published?: boolean;
}
