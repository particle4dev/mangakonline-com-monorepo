import { IsString, IsNumber } from 'class-validator';

export default class CrawlingChapterDto {
  // id của task
  @IsString()
  readonly _id!: string;

  // link chapter
  @IsString()
  readonly link!: string;

  // số thứ tự của chapter
  @IsNumber()
  readonly id!: number;

  // id của book
  @IsString()
  readonly book!: string;
}
