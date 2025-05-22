import { ObjectType, Field, ID } from '@nestjs/graphql';
import { City } from './city.entity';

@ObjectType()
export class State {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  uf: string;

  @Field(() => [City], { nullable: true }) 
  cities?: City[];
}