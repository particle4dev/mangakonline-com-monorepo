import { Types, Connection } from 'mongoose';
import { initializeLibraryChapterEntityModel } from '../src/library-module/schemas/chapter.schema';
import data from './1611249463346-library-chapters-data.json';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-library-chapters-data in production');
    return;
  }

  console.log(`insert dummy data for library chapters entity`);

  const Model = initializeLibraryChapterEntityModel(connection);

  const chapters = data.map(e => {
    const chapter = new Model();
    chapter._id = new Types.ObjectId(e._id);
    chapter.title = e.title;
    chapter.slug = e.slug;
    chapter.number = e.number;
    chapter.book = new Types.ObjectId(e.book);
    chapter.cover = new Types.ObjectId(e.cover);
    chapter.images = e.images.map(i => new Types.ObjectId(i));
    chapter.releaseDate = new Date(e.releaseDate);
    chapter.createdAt = new Date(e.createdAt);
    chapter.updatedAt = new Date(e.updatedAt);
    chapter.__v = e.__v;

    return chapter;
  });
  for (let i = 0; i < chapters.length; i++) {
    await chapters[i].save();
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-library-chapters-data in production');
    return;
  }

  const Model = initializeLibraryChapterEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
