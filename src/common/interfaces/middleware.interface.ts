import type { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
  executor: (req: Request, res: Response, next: NextFunction) => void;
}
