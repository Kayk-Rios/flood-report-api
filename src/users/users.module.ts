import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({ 
    providers: [UsersService, UsersResolver, PrismaService],
    exports: [UsersModule]
 })
export class UsersModule {}
