import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const e = (action: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response) => {
    try {
      await action(req, res);
    } catch (error: any) {
      console.error(error);
      res
        .status(error.status || StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  };
};
