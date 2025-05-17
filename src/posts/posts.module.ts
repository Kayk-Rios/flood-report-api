import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { PrismaService } from 'src/prisma/prisma.service';
import { LocationsModule } from 'src/locations/locations.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [LocationsModule, AuthModule],
  providers: [PostsService, PostsResolver,PrismaService]
})
export class PostsModule {}
