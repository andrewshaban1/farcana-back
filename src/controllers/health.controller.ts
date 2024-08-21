import { Request, Response } from 'express';

export const HealthCheck = async (req: Request, res: Response) => {
  res.send('Welcome to the test task!');
};
