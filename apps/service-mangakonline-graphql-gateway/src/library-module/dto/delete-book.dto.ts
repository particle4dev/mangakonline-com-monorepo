import {
  IsNotEmpty
} from 'class-validator';
import {
  DeleteBookInput
} from '../../graphql.schema';

export default class DeleteBookDto extends DeleteBookInput {
  @IsNotEmpty()
  slug: string;
}
