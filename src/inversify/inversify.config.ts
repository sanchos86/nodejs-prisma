import { Container } from 'inversify';

import { TYPES } from './types';
import { App } from '../app';
import { LoggerService } from '../logger/logger.service';
import { PrismaService } from '../database/prisma.service';
import { ConfigService } from '../config/config.service';
import { ExceptionFilter } from '../errors/exception.filter';
import { UsersRepository } from '../users/users.repository';
import { UsersService } from '../users/users.service';
import { UsersController } from '../users/users.controller';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';
import type { IConfigService } from '../config/interfaces/config.service.interface';
import type { IExceptionFilter } from '../errors/interfaces/exception.filter.interface';
import type { IUsersService } from '../users/interfaces/users.service.interface';

const container = new Container();
container.bind<App>(TYPES.App).to(App);
container.bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope();
container.bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope();
container.bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
container.bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter);
container.bind<UsersRepository>(TYPES.UsersRepository).to(UsersRepository);
container.bind<IUsersService>(TYPES.IUsersService).to(UsersService);
container.bind<UsersController>(TYPES.UsersController).to(UsersController);

export { container };
