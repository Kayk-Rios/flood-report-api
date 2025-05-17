
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePostInput } from './create-post.input';
import { FloodLevel } from '@prisma/client';

@InputType()
export class UpdatePostInput extends PartialType(CreatePostInput) {
  @Field(() => Number)
  id: number;
}