
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from 'src/auth/admin.guard';


@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  createPost(
    @Args('createPostInput') createPostInput: CreatePostInput,
    @Context() context,
  ) {
    return this.postsService.create(context.req.user.id, createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => [Post], { name: 'postsByState' })
  findByState(@Args('stateId', { type: () => Number }) stateId: number) {
    return this.postsService.findByState(stateId);
  }

  @Query(() => [Post], { name: 'postsByCity' })
  findByCity(@Args('cityId', { type: () => Number }) cityId: number) {
    return this.postsService.findByCity(cityId);
  }

  @Query(() => [Post], { name: 'postsByNeighborhood' })
  findByNeighborhood(@Args('neighborhood') neighborhood: string) {
    return this.postsService.findByNeighborhood(neighborhood);
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Number }) id: number) {
    return this.postsService.findOne(id);
  }

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  updatePost(
    @Args('updatePostInput') updatePostInput: UpdatePostInput,
    @Context() context,
  ) {
    return this.postsService.update(context.req.user.id, updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(AuthGuard)
  removePost(@Args('id', { type: () => Number }) id: number, @Context() context) {
    return this.postsService.remove(context.req.user.id, id);
  }

  // Admin-only mutations
  @Mutation(() => Post)
  @UseGuards(AdminGuard)
  adminUpdatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.adminUpdate(updatePostInput);
  }

  @Mutation(() => Post)
  @UseGuards(AdminGuard)
  adminRemovePost(@Args('id', { type: () => Number }) id: number) {
    return this.postsService.adminRemove(id);
  }
  @UseGuards(AuthGuard)
  @Query(() => [Post], { name: 'myPosts' })
  findMyPosts(@Context() context: any): Promise<Post[]> {
    const userId = context.req.user.id;
    return this.postsService.findPostsByUser(userId);
  }

  
}