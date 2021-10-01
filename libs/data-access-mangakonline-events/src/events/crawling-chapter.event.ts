import { Types } from 'mongoose';
import CrawlingChapterDto from '../dto/crawling-chapter.dto';

export default class CrawlingChapterEvent {
  private readonly taskId: Types.ObjectId | null = null;
  private readonly id: number | null = null;
  private readonly link: string | null = null;
  private readonly book: Types.ObjectId | null = null;

  constructor(
    public readonly payload: CrawlingChapterDto
  ) {
    this.id = payload.id;
    this.link = payload.link;
    this.book = new Types.ObjectId(payload.book);
    this.taskId = new Types.ObjectId(payload._id);
  }

  getTaskId() {
    return this.taskId;
  }

  getLink() {
    return this.link;
  }

  getBookId() {
    return this.book;
  }

  getChapterNumber(): number {
    return this.id;
  }
}
