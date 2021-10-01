import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataAccessAuthService } from '@mp-workspace/data-access-nest-auth-module';
import { AuthUserEntity } from '../graphql.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: DataAccessAuthService,
    private jwtService: JwtService
  ) {}

  async login(user: AuthUserEntity) {
    const payload = { username: user.username, sub: user._id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async verifyToken(token: string) {
    const {username} = this.jwtService.verify(token);
    return await this.usersService.findOneByUsername(username);
  }
}
