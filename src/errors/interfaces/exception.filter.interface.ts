import type { Request, Response, NextFunction } from 'express';

export interface IExceptionFilter {
  catch: (e: Error, req: Request, res: Response, next: NextFunction) => void;
}
