import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
      return this.prisma.user.findMany();
    }
  
    async findOne(id: number): Promise<User | null> {
      return this.prisma.user.findUnique({
        where: { id },
      });
    }


}
