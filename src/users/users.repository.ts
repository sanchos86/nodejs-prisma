import { inject, injectable } from 'inversify';
import type { UserModel } from '@prisma/client';

import { TYPES } from '../inversify/types';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { PrismaService } from '../database/prisma.service';

@injectable()
export class UsersRepository {
  constructor(@inject<PrismaService>(TYPES.PrismaService) private prismaService: PrismaService) {}

  create({ email, name, password }: UserRegisterDto): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: {
        email,
        name,
        password,
      },
    });
  }

  find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
