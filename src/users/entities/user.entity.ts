// src/users/entities/user.entity.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  isAdmin: boolean;

  @Field()
  createdAt?: Date;

  @Field()
  updatedAt?: Date;
}