import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true});
  
  const prismaService = app.get(PrismaService);
  const jwtService = app.get(JwtService);
  const authService = app.get(AuthService);
  app.use(async (req, res, next) => {
    const middleware = new AuthMiddleware(jwtService, authService);
    await middleware.use(req, res, next);
  });
  
  await app.listen(3001);
}
bootstrap();