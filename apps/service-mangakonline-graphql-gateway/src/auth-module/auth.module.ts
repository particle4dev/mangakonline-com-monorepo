import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataAccessAuthModule } from '@mp-workspace/data-access-nest-auth-module';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './strategies/password.strategy';
import { AuthResolvers } from './auth.resolvers';

@Module({
  imports: [
    DataAccessAuthModule,
    PassportModule.register({
      defaultStrategy: 'password-local'
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_TOKEN_SECRET')
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, PassportLocalStrategy, AuthResolvers],
  exports: [AuthService],
})
export class AuthModule {}
