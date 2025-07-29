/* eslint-disable prettier/prettier */
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    //we are converting the nestjs/common context into Graphql context and returning it from this function
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
