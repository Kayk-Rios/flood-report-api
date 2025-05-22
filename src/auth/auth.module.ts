import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule],
  providers: [AuthService, AuthResolver, PrismaService, AuthGuard, AdminGuard],
  exports: [AuthService, AuthGuard,AdminGuard],
})
export class AuthModule {}
