import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
  constructor(
    public readonly status: StatusCodes,
    message: string
  ) {
    super(message);
  }
}
