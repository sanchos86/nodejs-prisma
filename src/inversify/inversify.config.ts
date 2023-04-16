import { Container } from 'inversify';
import { TYPES } from './types';
import { App } from '../app';
import { LoggerService } from '../logger/logger.service';
import type { ILogger } from '../logger/interfaces/logger.interface';

const container = new Container();
container.bind<App>(TYPES.App).to(App);
container.bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();

export { container };
