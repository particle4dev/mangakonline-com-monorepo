import {
  IsNotEmpty
} from 'class-validator';

export default class AddNewAspectRatioDto {
  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;
}
