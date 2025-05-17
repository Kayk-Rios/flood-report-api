import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { FloodLevel } from "@prisma/client";
import { City } from "src/locations/entities/city.entity";
import { User } from "src/users/entities/user.entity";

registerEnumType(FloodLevel, {
  name: 'FloodLevel',
  description: 'Níveis de inundação',
});
@ObjectType()
export class Post {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => FloodLevel)
  floodLevel: FloodLevel;

  @Field(() => String, { nullable: true })
  address?: string | null;

  @Field(() => String, { nullable: true })
  neighborhood?: string | null;
  
  @Field(() => User)
  author: User;

  @Field(() => City)
  city: City;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}