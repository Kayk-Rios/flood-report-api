import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    await this.seedDatabase();
  }

  private async seedDatabase() {
    const statesCount = await this.state.count();
    if (statesCount === 0) {
      await this.state.createMany({
        data: [
          { name: 'São Paulo', uf: 'SP' },
          { name: 'Rio de Janeiro', uf: 'RJ' },
        ],
      });
  
      const sp = await this.state.findUnique({ where: { uf: 'SP' } });
      const rj = await this.state.findUnique({ where: { uf: 'RJ' } });
  
      if (sp) {
        await this.city.createMany({
          data: [
            { name: 'São Paulo', stateId: sp.id },
            { name: 'Campinas', stateId: sp.id },
          ],
        });
      }
  
      if (rj) {
        await this.city.createMany({
          data: [
            { name: 'Rio de Janeiro', stateId: rj.id },
            { name: 'Niterói', stateId: rj.id },
          ],
        });
      }
    }
  
    const adminUser = await this.user.findUnique({ where: { email: 'admin@example.com' } });
    if (!adminUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await this.user.create({
        data: {
          email: 'admin@example.com',
          password: hashedPassword,
          name: 'Admin',
          isAdmin: true,
        },
      });
    }
  }
}