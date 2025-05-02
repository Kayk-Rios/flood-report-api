import { Module } from '@nestjs/common';
import { LocationsService } from './locations.service';
import { LocationsResolver } from './locations.resolver';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [LocationsService, LocationsResolver, PrismaService]
})
export class LocationsModule {}
