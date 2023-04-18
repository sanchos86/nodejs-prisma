import { injectable, inject } from 'inversify';
import express from 'express';
import type { Express } from 'express';

import { TYPES } from './inversify/types';
import type { PrismaService } from './database/prisma.service';
import type { ILoggerService } from './logger/interfaces/logger.service.interface';
import type { IExceptionFilter } from './errors/interfaces/exception.filter.interface';
import type { UsersController } from './users/users.controller';

@injectable()
export class App {
  app: Express;

  port: number;

  constructor(
    @inject<ILoggerService>(TYPES.ILoggerService) public loggerService: ILoggerService,
    @inject<PrismaService>(TYPES.PrismaService) public prismaService : PrismaService,
    @inject<IExceptionFilter>(TYPES.IExceptionFilter) public exceptionFilter: IExceptionFilter,
    @inject<UsersController>(TYPES.UsersController) public usersController: UsersController,
  ) {
    this.app = express();
    this.port = 9090;
  }

  useMiddlewares() {
    this.app.use(express.json());
  }

  useRoutes() {
    this.app.use('/users', this.usersController.router);
  }

  useExceptionFilters() {
    this.app.use(this.exceptionFilter.catch);
  }

  public async init() {
    await this.prismaService.connect();
    this.useMiddlewares();
    this.useRoutes();
    this.useExceptionFilters();
    this.app.listen(this.port);
    this.loggerService.info(`--- Listening on port ${this.port} ---`);
  }
}
