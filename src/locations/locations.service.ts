import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { State } from './entities/state.entity';
import { City } from './entities/city.entity';
import { CreateCityInput } from './dto/create-city.input';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateCityInput } from './dto/update-city.input';
import { UpdateStateInput } from './dto/update-state.input';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  async findAllStates(): Promise<State[]> {
    return this.prisma.state.findMany({
      include: {
        cities: {
          include: {
            state: true,
          },
        },
      },
    });
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

  async createState(createStateInput: CreateStateInput): Promise<State> {
    return this.prisma.state.create({
      data: createStateInput,
    });
  }

  async updateState(updateStateInput: UpdateStateInput): Promise<State> {
    return this.prisma.state.update({
      where: { id: updateStateInput.id },
      data: updateStateInput,
    });
  }

  async deleteState(id: number): Promise<State> {
    return this.prisma.state.delete({
      where: { id },
    });
  }

  // Operações CRUD para Cidades
  async createCity(createCityInput: CreateCityInput): Promise<City> {
    return this.prisma.city.create({
      data: createCityInput,
      include: { state: true },
    });
  }

  async updateCity(updateCityInput: UpdateCityInput): Promise<City> {
    return this.prisma.city.update({
      where: { id: updateCityInput.id },
      data: updateCityInput,
      include: { state: true },
    });
  }

  async deleteCity(id: number): Promise<City> {
    return this.prisma.city.delete({
      where: { id },
      include: { state: true },
    });
  }
}
