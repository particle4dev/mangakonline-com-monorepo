import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envFilePath } from '../constants';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
    }),
  ],
})
export class GlobalModule {}
