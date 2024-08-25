import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import AuthService from '../services/auth.service';
import { HttpError } from '../utils/error';

export const Register = async (req: Request, res: Response) => {
  const { username, email, password, data } = req.body;
  if (!username || !email || !password || !data) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      'You have not provided all necessary properties'
    );
  }

  const authService = new AuthService();
  const user = await authService.createUser(username, email, password, data);

  const userResponse = _.omit(user.dataValues, ['password_hash']);
  res.status(StatusCodes.CREATED).json(userResponse);
};

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      'You have not provided all necessary properties'
    );
  }

  const authService = new AuthService();
  const { token, user } = await authService.loginUser(username, password);

  res.cookie('jwt', token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'lax',
  }); // maxAge = 1 day
  const userResponse = _.omit(user.dataValues, ['password_hash']);
  res.status(StatusCodes.OK).json(userResponse);
};
