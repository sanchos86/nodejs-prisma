import { injectable, inject } from 'inversify';
import type { Request, Response, NextFunction } from 'express';

import { TYPES } from '../inversify/types';
import { HttpError } from './http-error';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';
import type { IExceptionFilter } from './interfaces/exception.filter.interface';

@injectable()
export class ExceptionFilter implements IExceptionFilter {
  constructor(
    @inject<ILoggerService>(TYPES.ILoggerService)
    public loggerService: ILoggerService,
  ) {
    this.bindThis();
  }

  bindThis() {
    this.catch.bind(this);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catch(e: Error | HttpError, req: Request, res: Response, next: NextFunction) {
    if (e instanceof HttpError) {
      const message = `[${e.context}] Error ${e.statusCode}: ${e.message}`;
      this.loggerService.error(message);
      res.status(e.statusCode).json({ error: message });
    } else {
      const { message } = e;
      this.loggerService.error(message);
      res.status(500).json({ error: message });
    }
  }
}
