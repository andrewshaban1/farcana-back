import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

/**
 * Special wrapper function allowing to implement error boundary for controllers and services in the project.
 * Reduces amount of boilerplate code. You can throw HttpError, it will be caught and special response will be sent.
 * @param action controller function without try..catch block in it
 * @returns wrapper function with try..catch block
 */
export const e = (action: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await action(req, res);
    } catch (error: any) {
      console.error(error.status ? error.message : error);
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };
};
