import { Types, Connection } from 'mongoose';
import {
  GENDER_ENUM_TYPE,
  ROLES_ENUM_TYPE,
  STATUS_ENUM_TYPE
} from '@mp-workspace/data-access-constants';
import { initializeAuthUserEntityModel } from '@mp-workspace/data-access-nest-auth-module';
import data from './1611421041524-auth-users-data.json';

/**
 * Make any changes you need to make to the database here
 */
export async function up(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-auth-users-data in production');
    return;
  }

  const Model = initializeAuthUserEntityModel(connection);
  const users = data.map(e => {
    const user = new Model();
    user._id = new Types.ObjectId(e._id);
    user.username = e.username;
    user.profile = {
      fullname: e.profile.fullname,
      gender: GENDER_ENUM_TYPE.MALE,
    };
    user.roles = [ROLES_ENUM_TYPE.USER];
    user.services = e.services;
    user.status = STATUS_ENUM_TYPE.ACTIVE;

    return user;
  });

  for (let i = 0; i < users.length; i++) {
    await users[i].save();
  }
}
/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
export async function down(connection: Connection): Promise<void> {
  // Write migration here
  if(process.env.NODE_ENV === 'production') {
    console.log('Skip seed-auth-users-data in production');
    return;
  }

  const Model = initializeAuthUserEntityModel(connection);
  const ids = data.map(e => new Types.ObjectId(e._id));
  await Model.deleteMany({
    _id: {
      $in: ids
    }
  });
}
