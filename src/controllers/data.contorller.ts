import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import _ from 'lodash';

import DataService from '../services/data.service';
import { HttpError } from '../utils/error';

export const Profile = async (req: Request, res: Response) => {
  const userId = req.params.userId;
  if (!userId) {
    throw new HttpError(
      StatusCodes.BAD_REQUEST,
      'You have not provided all necessary properties'
    );
  }
  const dataService = new DataService();

  const userProfile = await dataService.getUserProfileDetails(userId);
  const userProfileResponse = _.omit(userProfile.dataValues, ['password_hash']);
  res.status(StatusCodes.OK).json(userProfileResponse);
};
