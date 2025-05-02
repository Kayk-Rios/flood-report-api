
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { State } from './entities/state.entity';
import { City } from './entities/city.entity';



@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAllStates(): Promise<State[]> {
    return this.prisma.state.findMany();
  }

  async findCitiesByState(stateId: number): Promise<City[]> {
    return this.prisma.city.findMany({
      where: { stateId },
      include: { state: true },
    });
  }

  async findCityById(id: number): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: { id },
      include: { state: true },
    });
  }
}