import { Types, Connection } from 'mongoose';
import { initializeCatalogBigramEntityModel } from '@mp-workspace/data-access-nest-catalog-module';
import data from './1612250023622-catalog-bigram-data.json';
/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-catalog-bigram-data in production');
    return;
  }

  console.log(`insert dummy data for catalog bigram entity`);

  const Model = initializeCatalogBigramEntityModel(connection);
  const bigramData = data.map(e => {
    const bigram = new Model();
    bigram._id = new Types.ObjectId(e._id);
    bigram.word1 = e.word1;
    bigram.word2 = e.word2;
    bigram.count = e.count;
    bigram.createdAt = new Date(e.createdAt || null);
    bigram.updatedAt = new Date(e.updatedAt || null);
    bigram.__v = e.__v || 0;

    return bigram;
  });

  for (let i = 0; i < bigramData.length; i++) {
    await bigramData[i].save();
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-catalog-bigram-data in production');
    return;
  }

  console.log(`remove dummy data for catalog bigram entity`);

  const Model = initializeCatalogBigramEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
