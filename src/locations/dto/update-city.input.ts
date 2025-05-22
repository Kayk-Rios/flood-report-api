import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { CreateCityInput } from './create-city.input';

@InputType()
export class UpdateCityInput extends PartialType(CreateCityInput) {
  @Field(() => Int)
  id: number;
}