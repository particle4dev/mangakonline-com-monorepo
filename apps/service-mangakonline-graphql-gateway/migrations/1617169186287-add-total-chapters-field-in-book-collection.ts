import { Types, Connection } from 'mongoose';
import { initializeLibraryBookEntityModel } from '../src/library-module/schemas/book.schema';
import { initializeLibraryChapterEntityModel } from '../src/library-module/schemas/chapter.schema';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  const BookModel = initializeLibraryBookEntityModel(connection);
  const ChapterModel = initializeLibraryChapterEntityModel(connection);

  const cursor = BookModel.find({}).cursor();

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const totalChapters = await ChapterModel.countDocuments({
      book: doc._id
    });

    const result = await BookModel.findOneAndUpdate({
      _id: doc._id
    }, {
      $set: {
        totalChapters,
      }
    }, {
      new: true
    });
    console.log(`Updated ${result.totalChapters} totalChapters for ${doc._id} book successfully`);
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  const BookModel = initializeLibraryBookEntityModel(connection);

  const cursor = BookModel.find({}).cursor();

  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    const result = await BookModel.findOneAndUpdate({
      _id: doc._id
    }, {
      $unset: {
        totalChapters: ""
      }
    }, {
      new: true
    });
    console.log(`Deleted totalChapters field for ${doc._id} book successfully`);
  }
}
