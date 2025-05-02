import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class State {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  uf: string;
}