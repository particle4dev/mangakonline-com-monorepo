import {
  IsNotEmpty
} from 'class-validator';

export default class AddNewPictureURLDto {
  @IsNotEmpty()
  url: string;

  alt?: string;
}
