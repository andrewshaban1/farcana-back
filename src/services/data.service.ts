import { StatusCodes } from 'http-status-codes';
import { Data } from '../entities/data.entity';
import { User } from '../entities/user.entity';
import { HttpError } from '../utils/error';

export default class DataService {
  async getUserProfileDetails(userId: string): Promise<User> {
    const userProfile = await User.findOne({
      where: { id: userId },
      include: { model: Data },
    });
    if (!userProfile) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `There is no user for ID ${userId}`
      );
    }
    return userProfile;
  }
}
