import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersModule } from 'src/users/users.module';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';

@Module({
  imports: [UsersModule],
  providers: [AuthService, AuthResolver, PrismaService, AuthGuard, AdminGuard],
  exports: [AuthService, AuthGuard,AdminGuard],
})
export class AuthModule {}
