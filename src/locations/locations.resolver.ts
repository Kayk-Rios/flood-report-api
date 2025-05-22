
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { State } from './entities/state.entity';
import { City } from './entities/city.entity';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

@Resolver()
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Query(() => [State])
  states() {
    return this.locationsService.findAllStates();
  }

  @Query(() => [City])
  citiesByState(@Args('stateId', { type: () => ID }) stateId: number) {
    return this.locationsService.findCitiesByState(stateId);
  }

  @Query(() => City, { nullable: true })
  city(@Args('id', { type: () => ID }) id: number) {
    return this.locationsService.findCityById(id);
  }


  @Mutation(() => State)
  createState(@Args('createStateInput') createStateInput: CreateStateInput) {
    return this.locationsService.createState(createStateInput);
  }

  @Mutation(() => State)
  updateState(@Args('updateStateInput') updateStateInput: UpdateStateInput) {
    return this.locationsService.updateState(updateStateInput);
  }

  @Mutation(() => State)
  deleteState(@Args('id', { type: () => ID }) id: number) {
    return this.locationsService.deleteState(id);
  }

  // Mutations para Cidades
  @Mutation(() => City)
  createCity(@Args('createCityInput') createCityInput: CreateCityInput) {
    return this.locationsService.createCity(createCityInput);
  }

  @Mutation(() => City)
  updateCity(@Args('updateCityInput') updateCityInput: UpdateCityInput) {
    return this.locationsService.updateCity(updateCityInput);
  }

  @Mutation(() => City)
  deleteCity(@Args('id', { type: () => ID }) id: number) {
    return this.locationsService.deleteCity(id);
  }
}