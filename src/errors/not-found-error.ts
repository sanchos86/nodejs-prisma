import { HttpError } from './http-error';

export class NotFoundError extends HttpError {
  constructor(message?: string, context?: string) {
    const normalizedMessage = message || 'Nothing found';
    super(404, normalizedMessage, context);
  }
}
