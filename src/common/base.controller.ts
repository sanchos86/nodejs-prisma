import { injectable } from 'inversify';
import { Router } from 'express';

import type { ILoggerService } from '../logger/interfaces/logger.service.interface';
import type { IRoute } from './interfaces/route.interface';

@injectable()
export class BaseController {
  readonly router: Router;

  loggerService: ILoggerService;

  constructor(loggerService: ILoggerService) {
    this.router = Router();
    this.loggerService = loggerService;
  }

  public bindRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      const handler = route.func.bind(this);
      const middleware = route.middleware?.map((el) => el.executor.bind(el));
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    });
  }
}
