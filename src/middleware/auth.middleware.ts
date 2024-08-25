import { Response } from 'express';
import { verify } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import { User } from '../entities/user.entity';
import config from '../config/default.config';
import { UserRequest } from '../types/common';
import { HttpError } from '../utils/error';

export const AuthMiddleware = async (
  req: UserRequest,
  res: Response,
  next: () => void
) => {
  try {
    const jwt = req.cookies['jwt'];

    const payload: any = verify(jwt, config.jwt.secret);

    if (!payload) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    }

    const user = await User.findOne({
      where: {
        id: payload.id,
      },
    });

    if (!user) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid Token');
    }

    req.user = user;
    next();
  } catch (error: any) {
    console.error(error.status ? error.message : error);

    res
      .status(error.status || StatusCodes.UNAUTHORIZED)
      .json({ message: error.message });
  }
};
