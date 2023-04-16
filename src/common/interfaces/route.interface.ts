import type {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import type { IMiddleware } from './middleware.interface';

export interface IRoute {
  path: string;
  method: keyof Pick<Router, 'get' | 'post' | 'patch' | 'delete' | 'put'>;
  func: (req: Request, res: Response, next: NextFunction) => void;
  middleware?: IMiddleware[]
}
