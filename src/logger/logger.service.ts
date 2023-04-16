import { injectable } from 'inversify';
import { Logger } from 'tslog';
import type { ILogObj } from 'tslog';

import type { ILoggerService } from './interfaces/logger.service.interface';

@injectable()
export class LoggerService implements ILoggerService {
  logger: Logger<ILogObj>;

  constructor() {
    this.logger = new Logger();
  }

  info(...args: unknown[]) {
    this.logger.info(...args);
  }

  error(...args: unknown[]) {
    this.logger.error(...args);
  }

  warn(...args: unknown[]) {
    this.logger.warn(...args);
  }
}
