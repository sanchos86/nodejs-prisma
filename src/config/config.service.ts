import { injectable, inject } from 'inversify';
import config from 'dotenv';
import type { DotenvParseOutput, DotenvConfigOutput } from 'dotenv';

import { TYPES } from '../inversify/types';
import type { IConfigService } from './interfaces/config.service.interface';
import type { ILoggerService } from '../logger/interfaces/logger.service.interface';

@injectable()
export class ConfigService implements IConfigService {
  config: DotenvParseOutput;

  constructor(@inject<ILoggerService>(TYPES.ILoggerService) public logger: ILoggerService) {
    const parsedConfig: DotenvConfigOutput = config.config();
    if (parsedConfig.error) {
      this.logger.error('Error when parsing env config');
    } else {
      this.config = parsedConfig.parsed as DotenvParseOutput;
    }
  }

  get(key: string): string {
    return this.config[key];
  }
}
