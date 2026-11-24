import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService implements OnModuleDestroy {
  private client: PrismaClient | undefined;

  async ready(): Promise<boolean> {
    if (!process.env.DATABASE_URL) return false;
    try {
      this.client ??= new PrismaClient();
      await this.client.$queryRaw`SELECT 1`;
      return true;
    } catch {
      return false;
    }
  }

  async onModuleDestroy() {
    await this.client?.$disconnect();
  }
}
