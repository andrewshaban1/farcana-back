import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import AuthService from '../services/auth.service';
import DataService from '../services/data.service';

export const Register = async (req: Request, res: Response) => {
  const { username, email, password, ...body } = req.body;

  const authService = new AuthService();
  const user = await authService.createUser(username, email, password);

  const userResponse = _.omit(user.dataValues, ['password_hash']);
  res.status(StatusCodes.CREATED).json(userResponse);
};

export const Login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const authService = new AuthService();
  const token = await authService.loginUser(username, password);

  res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // maxAge = 1 day

  res.status(StatusCodes.OK).json({ message: 'Logged in!' });
};

export const Profile = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const dataService = new DataService();

  const userProfile = await dataService.getUserProfileDetails(userId);
  res.status(StatusCodes.OK).json(userProfile);
};
