import { ObjectType, Field, ID } from '@nestjs/graphql';
import { State } from './state.entity';


@ObjectType()
export class City {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field(() => State)
  state: State;
}