import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataAccessAuthService, AuthUserEntityDocument } from '@mp-workspace/data-access-nest-auth-module';
import { comparePassword } from '../../utils/password';

@Injectable()
export class PassportLocalStrategy extends PassportStrategy(Strategy, 'password-local') {
  constructor(
    private usersService: DataAccessAuthService,
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<AuthUserEntityDocument> {
    const user = await this.usersService.findOneByUsername(username);
    if(!user) {
      throw new UnauthorizedException('Not found username');
    }
    if(!await comparePassword(password, user.services.password.bcrypt)) {
      throw new UnauthorizedException('Password is incorrect');
    }
    return user;
  }
}
