import * as path from 'path';

const { NODE_ENV = 'development' } = process.env;

export const basePath = NODE_ENV === 'production' ? process.cwd() : path.resolve(process.cwd(), 'apps', 'service-mangakonline-graphql-gateway');

export const envFilePath = [path.join(basePath, 'env', '.env')];

if(NODE_ENV === 'development') {
  envFilePath.push(path.join(basePath, 'env', '.env-development'));
}

if(NODE_ENV === 'test') {
  envFilePath.push(path.join(basePath, 'env', '.env-test'));
}

if(NODE_ENV === 'production') {
  envFilePath.push(path.join(basePath, 'env', '.env-production'));
}
