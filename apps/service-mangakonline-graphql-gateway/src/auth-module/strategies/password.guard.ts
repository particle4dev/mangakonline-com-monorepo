// https://github.com/nestjs/passport/blob/b2a14985a0b68277bfd6980b040b7053908595af/lib/auth.guard.ts#L51
import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class PassordLocalAuthGuard extends AuthGuard('password-local') {
  constructor(
    private readonly logger = new Logger(PassordLocalAuthGuard.name),
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext();
    request.body = ctx.getArgs();
    return request;
  }
}

// refreshToken: String!
