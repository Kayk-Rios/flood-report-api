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
  const authService = new AuthService(prismaService, jwtService);
  
  app.use(new AuthMiddleware(jwtService, authService).use);
  
  await app.listen(3001);
}
bootstrap();