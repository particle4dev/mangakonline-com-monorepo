/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import * as mongoose from 'mongoose';
import * as compression from 'compression';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(new ValidationPipe());

  // compression
  app.use(compression());

  const port = process.env.PORT || 3333;
  const server = await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
  Logger.log(`Application is running on: ${await app.getUrl()}`);
  // https://stackoverflow.com/questions/49187932/nestjs-request-timeout
  server.setTimeout(300 * 1000); // 5 min
}

bootstrap();
