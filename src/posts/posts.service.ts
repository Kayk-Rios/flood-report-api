
import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  private toPostEntity(post: any): Post {
    return {
      ...post,
      address: post.address ?? undefined,
      neighborhood: post.neighborhood ?? undefined,
    };
  }

  async create(userId: number, createPostInput: CreatePostInput): Promise<Post> {
    const post = await this.prisma.post.create({
      data: {
        ...createPostInput,
        authorId: userId,
      },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return this.toPostEntity(post);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return posts.map(this.toPostEntity);

  }

  async findByCity(cityId: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { cityId },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return posts.map(this.toPostEntity);

  }

  async findByState(stateId: number): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: {
        city: {
          stateId,
        },
      },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return posts.map(this.toPostEntity);

  }

  async findByNeighborhood(neighborhood: string): Promise<Post[]> {
    const posts = await this.prisma.post.findMany({
      where: { neighborhood },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return posts.map(this.toPostEntity);

  }

  async findOne(id: number): Promise<Post | null> {
    const post = await this.prisma.post.findUnique({
      where: { id },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return post ? this.toPostEntity(post) : null;

  }

  async update(userId: number, updatePostInput: UpdatePostInput): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id: updatePostInput.id },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only update your own posts');
    }

    const updatedPost = await this.prisma.post.update({
      where: { id: updatePostInput.id },
      data: updatePostInput,
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return this.toPostEntity(updatedPost);

  }

  async remove(userId: number, id: number): Promise<Post> {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('You can only delete your own posts');
    }

    const deletedPost = await this.prisma.post.delete({
      where: { id },
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return this.toPostEntity(deletedPost);
  }

  async adminUpdate(updatePostInput: UpdatePostInput): Promise<Post> {
    const updatedPost = await this.prisma.post.update({
      where: { id: updatePostInput.id },
      data: updatePostInput,
      include: {
        author: true,
        city: {
          include: {
            state: true,
          },
        },
      },
    });
    return this.toPostEntity(updatedPost);

  }

async adminRemove(id: number): Promise<Post> {
  const deletedPost = await this.prisma.post.delete({
    where: { id },
    include: {
      author: true,
      city: {
        include: {
          state: true,
        },
      },
    },
  });
  return this.toPostEntity(deletedPost);
}    
}