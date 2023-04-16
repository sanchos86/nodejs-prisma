import 'reflect-metadata';

import { container } from './inversify/inversify.config';
import { TYPES } from './inversify/types';
import type { App } from './app';

const bootstrap = async () => {
  const app = container.get<App>(TYPES.App);
  await app.init();
};

bootstrap();
