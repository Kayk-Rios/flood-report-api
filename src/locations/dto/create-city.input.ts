import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field(() => Int)
  stateId: number;
}