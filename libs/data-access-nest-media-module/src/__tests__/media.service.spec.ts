import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
// import { envFilePath } from '../../constants';
import { MediaPictureEntitySchemaName } from '../schemas/picture.schema';
import { DataAccessMediaService } from '../media.service';
// import { MODULE_CONNECTION_NAME } from '../constants';
import data from './data';

describe('DataAccessMediaService', () => {
  let service: DataAccessMediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessMediaService, {
        provide: getModelToken(MediaPictureEntitySchemaName),
        // define all the methods that you use from the catRepo
        // give proper return values as expected or mock implementations, your choice
        useValue: {
          // find: jest.fn().mockResolvedValue(catArray),
          find: jest.fn(() => ([data])),
          findOne: jest.fn(_id => ({
            ...data,
            _id,
          })),
          // findOneOrFail: jest.fn().mockResolvedValue(oneCat),
          // create: jest.fn().mockReturnValue(oneCat),
          // save: jest.fn(),
          // // as these do not actually use their return values in our sample
          // // we just make sure that their resolee is true to not crash
          // update: jest.fn().mockResolvedValue(true),
          // // as these do not actually use their return values in our sample
          // // we just make sure that their resolee is true to not crash
          // delete: jest.fn().mockResolvedValue(true),
        },
      }],
    }).compile();

    service = module.get<DataAccessMediaService>(DataAccessMediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPicture', () => {
    it('should return a picture', async () => {
      const picture = await service.getPicture(new Types.ObjectId("60050c81d7019caab9118fc8"));
      // expect(picture.toObject()).toEqual(data);
      expect(picture).toEqual(data);
    });
  });
});
