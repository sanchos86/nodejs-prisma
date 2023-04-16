import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import type { Request, Response, NextFunction } from 'express';

import type { IMiddleware } from './interfaces/middleware.interface';

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  executor({ body }: Request, res: Response, next: NextFunction) {
    const instance = plainToInstance(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length) {
        res.status(422).json({ errors });
      } else {
        next();
      }
    });
  }
}
