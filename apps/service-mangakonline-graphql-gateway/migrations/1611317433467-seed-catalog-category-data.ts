import { Types, Connection } from 'mongoose';
import { initializeCatalogCategoryEntityModel } from '@mp-workspace/data-access-nest-catalog-module';
import data from './1611317433467-catalog-category-data.json';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-catalog-category-data in production');
    return;
  }

  console.log(`insert dummy data for catalog categories entity`);

  const Model = initializeCatalogCategoryEntityModel(connection);
  const categories = data.map(e => {
    const category = new Model();
    category._id = new Types.ObjectId(e._id);
    category.slug = e.slug;
    category.label = e.label;
    category.images = e.images.map(i => new Types.ObjectId(i));
    category.createdAt = new Date(e.createdAt);
    category.updatedAt = new Date(e.updatedAt);
    category.__v = e.__v;

    return category;
  });

  for (let i = 0; i < categories.length; i++) {
    await categories[i].save();
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-catalog-category-data in production');
    return;
  }

  console.log(`remove dummy data for catalog categories entity`);

  const Model = initializeCatalogCategoryEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
