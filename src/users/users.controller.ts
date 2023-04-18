import { injectable, inject } from 'inversify';
import jsonwebtoken from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

import { BaseController } from '../common/base.controller';
import { AuthMiddleware } from '../common/auth.middleware';
import { ValidateMiddleware } from '../common/validate.middleware';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { TYPES } from '../inversify/types';
import { HttpError } from '../errors/http-error';
import type { IRoute } from '../common/interfaces/route.interface';
import type { IConfigService } from '../config/interfaces/config.service.interface';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';
import type { IUsersService } from './interfaces/users.service.interface';
import type { CustomRecord } from '../types';

const { sign } = jsonwebtoken;

@injectable()
export class UsersController extends BaseController {
  private readonly routes: IRoute[] = [
    {
      path: '/login',
      method: 'post',
      func: this.login,
      middleware: [new ValidateMiddleware(UserLoginDto)],
    },
    {
      path: '/register',
      method: 'post',
      func: this.register,
      middleware: [new ValidateMiddleware(UserRegisterDto)],
    },
    {
      path: '/profile',
      method: 'get',
      func: this.profile,
      middleware: [new AuthMiddleware(this.configService.get('SECRET'))],
    },
  ];

  constructor(
  @inject<ILoggerService>(TYPES.ILoggerService) loggerService: ILoggerService,
    @inject<IConfigService>(TYPES.IConfigService) public configService: IConfigService,
    @inject<IUsersService>(TYPES.IUsersService) public usersService: IUsersService,
  ) {
    super(loggerService);
    this.bindRoutes(this.routes);
  }

  async login(
    { body }: Request<CustomRecord, CustomRecord, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.usersService.validateUser(body);
    if (!user) {
      next(new HttpError(400, 'User not found'));
    } else {
      const token = await this.signJWT(body.email, this.configService.get('SECRET'));
      res.json({ token });
    }
  }

  async register(
    { body }: Request<CustomRecord, CustomRecord, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ) {
    const user = await this.usersService.createUser(body);
    if (!user) {
      next(new HttpError(400, 'User already exists'));
    } else {
      res.json({ message: 'register from controller', user });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  profile(req: Request, res: Response, next: NextFunction): void {
    res.json({ message: 'profile', email: req.user });
  }

  // eslint-disable-next-line class-methods-use-this
  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise((resolve, reject) => {
      sign(
        {
          email,
          iat: Math.floor(Date.now() / 1000),
        },
        secret,
        {
          algorithm: 'HS256',
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token as string);
          }
        },
      );
    });
  }
}
