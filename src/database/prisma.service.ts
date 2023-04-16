import { injectable, inject } from 'inversify';
import { PrismaClient } from '@prisma/client';

import { TYPES } from '../inversify/types';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';

@injectable()
export class PrismaService {
  public readonly client: PrismaClient;

  constructor(@inject(TYPES.ILoggerService) public loggerService: ILoggerService) {
    this.client = new PrismaClient();
  }

  async connect() {
    try {
      await this.client.$connect();
      this.loggerService.info('Connected to prisma');
    } catch (e) {
      const message = e instanceof Error ? `Error on connection to prisma: ${e.message}` : 'Error on connection to prisma';
      this.loggerService.error(message);
    }
  }

  async disconnect() {
    await this.client.$disconnect();
  }
}
