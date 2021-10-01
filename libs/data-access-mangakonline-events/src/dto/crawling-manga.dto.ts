import { IsString } from 'class-validator';

export default class CrawlingMangaDto {
  // id của task
  @IsString()
  readonly _id!: string;

  // link manga
  @IsString()
  readonly link!: string;
}
