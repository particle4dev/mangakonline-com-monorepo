import { Types } from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthUserEntitySchemaName } from '../schemas/user.schema';
import { DataAccessAuthService } from '../users.service';
import data from './data';

describe('DataAccessAuthService', () => {
  let service: DataAccessAuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataAccessAuthService, {
        provide: getModelToken(AuthUserEntitySchemaName),
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

    service = module.get<DataAccessAuthService>(DataAccessAuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await service.findOne(new Types.ObjectId("60050c81d7019caab9118fc8"));
      // expect(picture.toObject()).toEqual(data);
      expect(user).toEqual(data);
    });
  });
});
