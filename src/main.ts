
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  

  const jwtService = app.get(JwtService);
  const authService = app.get(AuthService); 
  
  app.use(new AuthMiddleware(jwtService, authService).use);
  
  await app.listen(3001);
}
bootstrap();