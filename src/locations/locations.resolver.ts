
import { Resolver, Query, Args, ID } from '@nestjs/graphql';
import { LocationsService } from './locations.service';
import { State } from './entities/state.entity';
import { City } from './entities/city.entity';

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
}