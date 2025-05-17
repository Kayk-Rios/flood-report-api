import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    
    if (!req.user) {
      throw new UnauthorizedException();
    }
    
    try {
      const user = await this.authService.validateUser(req.user.id);
      req.user = user;
      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }
}