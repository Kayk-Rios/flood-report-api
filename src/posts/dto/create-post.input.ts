import { InputType, Field } from '@nestjs/graphql';
import { FloodLevel } from '@prisma/client';

@InputType()
export class CreatePostInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => FloodLevel)
  floodLevel: FloodLevel;

  @Field({ nullable: true })
  address?: string;

  @Field({ nullable: true })
  neighborhood?: string;

  @Field(() => Number)
  cityId: number;
}