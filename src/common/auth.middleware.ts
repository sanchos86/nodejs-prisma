import jsonwebtoken from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';

import { HttpError } from '../errors/http-error';
import { IMiddleware } from './interfaces/middleware.interface';

const { verify } = jsonwebtoken;

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  // eslint-disable-next-line class-methods-use-this
  executor(req: Request, res: Response, next: NextFunction): void {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader?.split(' ')[1];
    if (!token) {
      next(new HttpError(401, 'Missing token'));
    } else {
      verify(token, this.secret, (err, payload) => {
        if (err) {
          next(new HttpError(401, 'Invalid token'));
        } else if (payload) {
          if (typeof payload === 'string') {
            req.user = payload;
          } else {
            req.user = payload.email;
          }
          next();
        }
      });
    }
  }
}
