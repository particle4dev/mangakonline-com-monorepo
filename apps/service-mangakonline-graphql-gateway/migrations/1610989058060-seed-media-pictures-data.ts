import { Types, Connection } from 'mongoose';
import { initializeMediaPictureEntityModel } from '@mp-workspace/data-access-nest-media-module';
import data from './1610989058060-media-pictures-data.json';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-media-pictures-data migration in production');
    return;
  }

  console.log(`insert dummy data for media pictures entity`);

  const Model = initializeMediaPictureEntityModel(connection);
  const pictures = data.map(e => {
    const picture = new Model();
    picture._id = new Types.ObjectId(e._id);
    picture.filename = e.filename;
    picture.alt = e.alt;
    picture.aspectRatio = e.aspectRatio;
    picture.sizes = e.sizes;
    picture.createdAt = new Date(e.createdAt || null);
    picture.updatedAt = new Date(e.updatedAt || null);
    picture.__v = e.__v || 0;

    return picture;
  });

  for (let i = 0; i < pictures.length; i++) {
    await pictures[i].save();
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-media-pictures-data migration in production');
    return;
  }

  console.log(`remove dummy data for media pictures entity`);

  const Model = initializeMediaPictureEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
