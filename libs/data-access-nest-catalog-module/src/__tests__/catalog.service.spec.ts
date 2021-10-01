// https://github.com/jmcdo29/testing-nestjs/blob/master/apps/mongo-sample/src/cat/cat.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DataAccessCatalogService } from '../catalog.service';
import {
  CatalogBigramEntitySchemaName,
  CatalogBigramEntityDocument,
  CatalogBigramEntitySchema
} from '../schemas/bigram.schema';
import {
  CatalogCategoryEntitySchemaName,
  CatalogCategoryEntityDocument,
  CatalogCategoryEntitySchema
} from '../schemas/category.schema';
import {
  CatalogCustomCollectionEntitySchemaName,
  CatalogCustomCollectionEntityDocument,
  CatalogCustomCollectionEntitySchema
} from '../schemas/customcollection.schema';
import { MODULE_CONNECTION_NAME } from '../constants';

describe('CatalogService', () => {
  let service: DataAccessCatalogService;
  let bigramModel: Model<CatalogBigramEntityDocument>;
  let categoryModel: Model<CatalogCategoryEntityDocument>;
  let customCollectionModel: Model<CatalogCustomCollectionEntityDocument>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_URI'),
          }),
          inject: [ConfigService],
          connectionName: MODULE_CONNECTION_NAME
        }),
        MongooseModule.forFeature([{
          name: CatalogBigramEntitySchemaName,
          schema: CatalogBigramEntitySchema
        }, {
          name: CatalogCategoryEntitySchemaName,
          schema: CatalogCategoryEntitySchema
        }, {
          name: CatalogCustomCollectionEntitySchemaName,
          schema: CatalogCustomCollectionEntitySchema
        }], MODULE_CONNECTION_NAME),
      ],
      providers: [DataAccessCatalogService],
      exports: [DataAccessCatalogService],
    }).compile();

    service = module.get<DataAccessCatalogService>(DataAccessCatalogService);
    bigramModel = module.get<Model<CatalogBigramEntityDocument>>(getModelToken(CatalogBigramEntitySchemaName));
    categoryModel = module.get<Model<CatalogCategoryEntityDocument>>(getModelToken(CatalogCategoryEntitySchemaName));
    customCollectionModel = module.get<Model<CatalogCustomCollectionEntityDocument>>(getModelToken(CatalogCustomCollectionEntitySchemaName));

    await bigramModel.deleteMany({});
    await categoryModel.deleteMany({});
    await customCollectionModel.deleteMany({});
  });

  /**
   * These all may seem like simple tests that don't do much, but in reality
   * the controller itself is pretty simple. Call a service and return it's value,
   * the complicated stuff comes in either in the service, a pipe, or the interceptor
   */
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createNewCategory', () => {
    it('should return a new category', async done => {
      const returnedCategory1 = await service.createNewCategory({
        slug: 'test-1',
        label: 'Test 1'
      });

      expect(returnedCategory1.slug).toEqual('test-1');
      expect(returnedCategory1.label).toEqual('Test 1');

      const returnedCategory2 = await service.createNewCategory({
        slug: 'test-2',
        label: 'Test 2'
      });

      expect(returnedCategory2.slug).toEqual('test-2');
      expect(returnedCategory2.label).toEqual('Test 2');

      done();
    });
  });

  describe('findCatalogCategoryBySlug', () => {
    it('should get a category', async () => {
      const returnedCategory  = await service.findCatalogCategoryBySlug('test-1');

      expect(returnedCategory.slug).toEqual('test-1');
    });
  });

  describe('findCatalogCategoryBySlugs', () => {
    it('should get a category array', async () => {
      const returnedCategory  = await service.findCatalogCategoryBySlugs(['test-1']);

      expect(returnedCategory.length).toEqual(1);
    });
  });

  describe('createNewCustomCollection', () => {
    it('should return a new category', async done => {
      const returnedCustomCollection  = await service.createNewCustomCollection({
        slug: 'test-1',
        title: 'Test 1'
      });

      expect(returnedCustomCollection.slug).toEqual('test-1');
      expect(returnedCustomCollection.title).toEqual('Test 1');

      done();
    });
  });

  describe('updateCategoryIntoCustomCollection', () => {
    it('should return a new collect', async done => {
      const category  = await service.findCatalogCategoryBySlug('test-1');
      const customCollection  = await service.findCatalogCustomCollectionBySlug('test-1');

      const returnedCustomCollection  = await service.updateCategoryIntoCustomCollection({
        category: category._id,
        collection: customCollection._id,
        position: 1
      });

      expect(returnedCustomCollection.categories.length).toEqual(1);
      expect(returnedCustomCollection._id).toEqual(customCollection._id);

      const collect = returnedCustomCollection.categories[0];
      expect(collect.position).toEqual(1);
      expect(collect.category).toEqual(category._id);

      done();
    });

    it('should update a collect', async done => {
      const category  = await service.findCatalogCategoryBySlug('test-1');
      const customCollection  = await service.findCatalogCustomCollectionBySlug('test-1');

      const returnedCustomCollection  = await service.updateCategoryIntoCustomCollection({
        category: category._id,
        collection: customCollection._id,
        position: 10
      });

      expect(returnedCustomCollection.categories.length).toEqual(1);
      expect(returnedCustomCollection._id).toEqual(customCollection._id);

      const collect = returnedCustomCollection.categories[0];
      expect(collect.position).toEqual(10);
      expect(collect.category).toEqual(category._id);

      done();
    });

    it('should return a new collect with position is equal categories length', async done => {
      const category  = await service.findCatalogCategoryBySlug('test-2');
      const customCollection  = await service.findCatalogCustomCollectionBySlug('test-1');

      const returnedCustomCollection  = await service.updateCategoryIntoCustomCollection({
        category: category._id,
        collection: customCollection._id,
      });

      expect(returnedCustomCollection.categories.length).toEqual(2);
      expect(returnedCustomCollection._id).toEqual(customCollection._id);

      const collect = returnedCustomCollection.categories[1];
      expect(collect.position).toEqual(2);
      expect(collect.category).toEqual(category._id);

      done();
    });
  });

});
