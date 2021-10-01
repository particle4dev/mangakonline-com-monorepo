import { Test, TestingModule } from '@nestjs/testing';
import { DataAccessMediaService, AddNewPictureURLDto } from  '@mp-workspace/data-access-nest-media-module';
import { PictureResolvers } from '../picture.resolvers';
import data from './data';

describe('PictureResolvers', () => {
  let resolver: PictureResolvers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PictureResolvers,
        {
          provide: DataAccessMediaService,
          // using a factory just because
          useFactory: () => ({
            getPicture: jest.fn(_id => ({
              ...data,
              _id,
            })),
            addNewPictureURL: jest.fn((input: AddNewPictureURLDto) => ({
              ...data,
              alt: input.alt,
              sizes: [
                {
                  height: 1235,
                  width: 869,
                  type: "jpg",
                  url: input.url
                }
              ],
            })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<PictureResolvers>(PictureResolvers);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('picture', () => {
    it('should get one picture', async () => {
      expect(await resolver.findOneById(data._id)).toEqual(data);
    });
  });

  describe('addNewPictureURL', () => {
    it('should make a new cat', async () => {
      const url = 'https://genk.mediacdn.vn/2018/4/3/24-1522750924838398701176.jpg';
      const alt = 'lightbox-content';
      const result = {
        ...data,
        alt: alt,
        sizes: [
          {
            height: 1235,
            width: 869,
            type: "jpg",
            url: url
          }
        ],
      };
      expect(
        await resolver.addNewPictureURL({
          url,
          alt
        }),
      ).toEqual({
        picture: result
      });
    });
  });
});
