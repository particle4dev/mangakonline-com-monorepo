import {
  IsNotEmpty
} from 'class-validator';

export default class AddNewTaskDto {
  @IsNotEmpty()
  link: string;

  payload?: Record<string, string>;
}
