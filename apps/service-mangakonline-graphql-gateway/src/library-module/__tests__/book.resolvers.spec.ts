import { Test, TestingModule } from '@nestjs/testing';
import { BookResolver } from '../book.resolver';
import { LibraryService } from '../library.service';
import { DataAccessMediaService } from  '@mp-workspace/data-access-nest-media-module';
// import { AddNewPictureURLDto } from '../dto';
// import data from './data';

describe('LibraryBookEntityResolvers', () => {
  let resolver: BookResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookResolver,
        {
          provide: LibraryService,
          // using a factory just because
          useFactory: () => ({
            // getPicture: jest.fn(_id => ({
            //   ...data,
            //   _id,
            // })),
            // addNewPictureURL: jest.fn((input: AddNewPictureURLDto) => ({
            //   ...data,
            //   alt: input.alt,
            //   sizes: [
            //     {
            //       height: 1235,
            //       width: 869,
            //       type: "jpg",
            //       url: input.url
            //     }
            //   ],
            // })),
          }),
        },
        {
          provide: DataAccessMediaService,
          // using a factory just because
          useFactory: () => ({
            // getPicture: jest.fn(_id => ({
            //   ...data,
            //   _id,
            // })),
            // addNewPictureURL: jest.fn((input: AddNewPictureURLDto) => ({
            //   ...data,
            //   alt: input.alt,
            //   sizes: [
            //     {
            //       height: 1235,
            //       width: 869,
            //       type: "jpg",
            //       url: input.url
            //     }
            //   ],
            // })),
          }),
        },
      ],
    }).compile();

    resolver = module.get<BookResolver>(BookResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  // describe('picture', () => {
  //   it('should get one picture', async () => {
  //     expect(await resolver.findOneById(data._id)).toEqual(data);
  //   });
  // });

  // describe('addNewPictureURL', () => {
  //   it('should make a new cat', async () => {
  //     const url = 'https://genk.mediacdn.vn/2018/4/3/24-1522750924838398701176.jpg';
  //     const alt = 'lightbox-content';
  //     const result = {
  //       ...data,
  //       alt: alt,
  //       sizes: [
  //         {
  //           height: 1235,
  //           width: 869,
  //           type: "jpg",
  //           url: url
  //         }
  //       ],
  //     };
  //     expect(
  //       await resolver.addNewPictureURL({
  //         url,
  //         alt
  //       }),
  //     ).toEqual({
  //       picture: result
  //     });
  //   });
  // });
});
