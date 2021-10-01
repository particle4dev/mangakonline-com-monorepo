import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DataAccessMediaService } from './media.service';
import { MediaAspectRatioEntitySchemaName, MediaAspectRatioEntitySchema } from './schemas/aspect-ratio.schema';
import { MediaPictureEntitySchemaName, MediaPictureEntitySchema } from './schemas/picture.schema';
import { MODULE_CONNECTION_NAME } from './constants';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_MEDIA_SERVICE_URI'),
      }),
      inject: [ConfigService],
      connectionName: MODULE_CONNECTION_NAME
    }),
    MongooseModule.forFeature([{
      name: MediaAspectRatioEntitySchemaName,
      schema: MediaAspectRatioEntitySchema
    }, {
      name: MediaPictureEntitySchemaName,
      schema: MediaPictureEntitySchema
    }], MODULE_CONNECTION_NAME),
  ],
  providers: [DataAccessMediaService],
  exports: [DataAccessMediaService],
})
export class DataAccessMediaModule {}
