import { Mutation, Resolver, GqlExecutionContext } from '@nestjs/graphql';
import { createParamDecorator, ExecutionContext, UseGuards } from '@nestjs/common';
import { LoginPayload } from '../graphql.schema';
import { PassordLocalAuthGuard } from './strategies/password.guard';
import { AuthService } from './auth.service';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request.user;
  },
);

@Resolver('Auth')
export class AuthResolvers {
  constructor(private authService: AuthService) {}

  @UseGuards(PassordLocalAuthGuard)
  @Mutation('login')
  public async login(@CurrentUser() user): Promise<LoginPayload> {
    return this.authService.login(user);
  }
}
