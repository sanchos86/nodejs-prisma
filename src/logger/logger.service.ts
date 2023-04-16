import { injectable } from 'inversify';
import { Logger, ILogObj } from 'tslog';
import type { ILogger } from './interfaces/logger.interface';

@injectable()
export class LoggerService implements ILogger {
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
