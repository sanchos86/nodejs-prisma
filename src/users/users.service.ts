import { injectable, inject } from 'inversify';

import { TYPES } from '../inversify/types';
import { hashPassword, comparePasswords } from './utils';
import type { IUsersService } from './interfaces/users.service.interface';
import type { UserRegisterDto } from './dto/user-register.dto';
import type { UserLoginDto } from './dto/user-login.dto';
import type { UsersRepository } from './users.repository';
import type { IConfigService } from '../config/interfaces/config.service.interface';

@injectable()
export class UsersService implements IUsersService {
  constructor(
    @inject<IConfigService>(TYPES.IConfigService) public configService: IConfigService,
    @inject<UsersRepository>(TYPES.UsersRepository) public usersRepository: UsersRepository,
  ) {
  }

  async createUser({ name, email, password }: UserRegisterDto) {
    const hasUser = await this.usersRepository.find(email);
    if (hasUser) {
      return null;
    }

    const salt = this.configService.get('HASH_SALT');
    const hashedPassword = await hashPassword(password, Number(salt));
    return this.usersRepository.create({
      password: hashedPassword,
      name,
      email,
    });
  }

  async validateUser({ email, password } : UserLoginDto) {
    const existingUser = await this.usersRepository.find(email);
    if (!existingUser) {
      return false;
    }
    return comparePasswords(password, existingUser.password);
  }
}
