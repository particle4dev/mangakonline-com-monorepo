import * as url from "url";
import { Types } from 'mongoose';

import CrawlingMangaDto from '../dto/crawling-manga.dto';

export default class CrawlingMangaEvent {
  private readonly url: url.UrlWithStringQuery | null = null;
  private readonly id: Types.ObjectId | null = null;

  constructor(
    public readonly payload: CrawlingMangaDto
  ) {
    this.url = url.parse(payload.link);
    this.id = new Types.ObjectId(payload._id);
  }

  getManga() {
    const path = this.url.path.split('/');
    return path.pop();
  }

  getLink() {
    return this.url.href;
  }

  getId(): Types.ObjectId {
    return this.id;
  }
}
