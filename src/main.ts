import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthMiddleware } from './auth/auth.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(new AuthMiddleware().use);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
