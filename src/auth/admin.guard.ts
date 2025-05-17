import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AdminGuard extends AuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);
    
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    
    if (!req.user.isAdmin) {
      throw new ForbiddenException('Admin access only');
    }
    
    return true;
  }
}