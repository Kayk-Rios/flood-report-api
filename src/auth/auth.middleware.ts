import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
 
    const token = req.headers['authorization'];
    if (token === 'session-token') {

        req.user = { 
          id: 1, 
          email: 'admin@example.com',
          name: 'Admin',
          isAdmin: true,
          createdAt: new Date(),
          updatedAt: new Date()
        } as User;
      }
    next();
  }
}