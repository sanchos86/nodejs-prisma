import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';

import { TYPES } from '../inversify/types';
import { UsersService } from './users.service';
import { PrismaService } from '../database/prisma.service';

import type { UsersRepository } from './users.repository';
import type { IConfigService } from '../config/interfaces/config.service.interface';
import type { IUsersService } from './interfaces/users.service.interface';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';

const configServiceMock: IConfigService = {
  get: jest.fn(),
};

const loggerServiceMock: ILoggerService = {
  logger: jest.fn(),
  warn: jest.fn(),
  info: jest.fn(),
  error: jest.fn(),
};

const container = new Container();
let usersRepository: UsersRepository;
let configService: IConfigService;
let userService: IUsersService;

beforeAll(() => {
  container.bind<IUsersService>(TYPES.IUsersService).to(UsersService);
  container.bind<PrismaService>(TYPES.PrismaService).to(PrismaService);
  container.bind<ILoggerService>(TYPES.ILoggerService).toConstantValue(loggerServiceMock);
  container.bind<IConfigService>(TYPES.IConfigService).toConstantValue(configServiceMock);
  const usersRepositoryMock: UsersRepository = {
    prismaService: container.get<PrismaService>(TYPES.PrismaService),
    create: jest.fn(),
    find: jest.fn(),
  };
  container.bind<UsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMock);

  usersRepository = container.get<UsersRepository>(TYPES.UsersRepository);
  configService = container.get<IConfigService>(TYPES.IConfigService);
  userService = container.get<IUsersService>(TYPES.IUsersService);
});

describe('user.service.ts', () => {
  it('create user', async () => {
    const id = 1;
    const name = 'Aleksandr';
    const email = 'admin@admin.com';
    const password = 'qwerty';
    configService.get = jest.fn().mockReturnValue('SECRET');
    usersRepository.create = jest.fn()
      .mockImplementationOnce((dto: UserRegisterDto): UserModel => ({
        id,
        name: dto.name,
        email: dto.email,
        password: dto.password,
      }));
    const user = await userService.createUser({ name, email, password });

    expect(user?.id).toEqual(id);
  });
});
