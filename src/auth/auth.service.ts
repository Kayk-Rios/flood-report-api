import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';


@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async signup(signupInput: SignupInput): Promise<Auth> {
    const hashedPassword = await bcrypt.hash(signupInput.password, 10);
    
    const user = await this.prisma.user.create({
      data: {
        email: signupInput.email,
        password: hashedPassword,
        name: signupInput.name,
      },
    });

    const payload = { 
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin 
    };

    return {
      token:  this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  }

  async login(loginInput: LoginInput): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: { email: loginInput.email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const valid = await bcrypt.compare(loginInput.password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    const payload = { 
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin 
    };

    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin,
      },
    };
  }

  async validateUser(userId: number): Promise<{
    id: number;
    email: string;
    name: string;
    isAdmin: boolean;
  } | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      return null;
    }
  
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
    };
  }
}