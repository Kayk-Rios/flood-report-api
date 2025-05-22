import { InputType, Field, PartialType, ID } from '@nestjs/graphql';
import { CreateStateInput } from './create-state.input';

@InputType()
export class UpdateStateInput extends PartialType(CreateStateInput) {
  @Field(() => ID)
  id: number;
}