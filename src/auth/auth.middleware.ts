import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers.authorization;
    if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
      const token = authHeader.split(' ')[1];

      try {
        const payload = await this.jwtService.verifyAsync<{ sub: number }>(token);
        const user = await this.authService.validateUser(payload.sub);


        if (user) {
          req.user = {
            id: user.id,
            email: user.email,
            name: user.name,
            isAdmin: user.isAdmin,
          } 
        }
      } catch (err) {
          console.error('Token validation error:', err.message);
      }
      }
    next();
  }
}