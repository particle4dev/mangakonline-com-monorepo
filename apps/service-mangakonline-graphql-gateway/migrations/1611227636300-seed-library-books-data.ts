import { Types, Connection } from 'mongoose';
import { initializeLibraryBookEntityModel } from '../src/library-module/schemas/book.schema';
import data from './1611227636300-library-books-data.json';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-library-books-data in production');
    return;
  }

  console.log(`insert dummy data for library books entity`);

  const Model = initializeLibraryBookEntityModel(connection);
  const books = data.map(e => {
    const book = new Model();
    book._id = new Types.ObjectId(e._id);
    book.slug = e.slug;
    book.title = e.title;
    book.cover = new Types.ObjectId(e.cover);
    book.categories = e.categories.map(c => new Types.ObjectId(c));
    book.description = e.description;
    book.createdAt = new Date(e.createdAt);
    book.updatedAt = new Date(e.updatedAt);
    book.__v = e.__v;

    return book;
  });
  for (let i = 0; i < books.length; i++) {
    await books[i].save();
  }
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-library-books-data in production');
    return;
  }

  console.log(`remove dummy data for library books entity`);

  const Model = initializeLibraryBookEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
