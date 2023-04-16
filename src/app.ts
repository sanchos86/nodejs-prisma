import { injectable, inject } from 'inversify';
import express, { Express } from 'express';
import { TYPES } from './inversify/types';
import type { ILogger } from './logger/interfaces/logger.interface';

@injectable()
export class App {
  app: Express;

  port: number;

  constructor(
    @inject(TYPES.ILogger) public logger: ILogger,
  ) {
    this.app = express();
    this.port = 9090;
  }

  public async init() {
    this.app.listen(this.port);
    this.logger.info(`---Listening on port ${this.port}---`);
  }
}
