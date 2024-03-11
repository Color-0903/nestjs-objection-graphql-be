import { Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { 
  getRequest(context: any) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}