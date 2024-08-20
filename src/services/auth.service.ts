import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { User } from '../entities/user.entity';
import { HttpError } from '../utils/error';
import config from '../config/default.config';

export default class AuthService {
  async createUser(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    let existingUser;

    existingUser = await User.findOne({ where: { username } });

    if (existingUser) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with username ${username} already exists. Try different username`
      );
    }

    existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        `User with email ${email} already exists. Try different email`
      );
    }
    const password_hash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password_hash });
    return user;
  }

  async loginUser(username: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Credentials are incorrect'
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordMatch) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Credentials are incorrect'
      );
    }

    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = sign(payload, config.jwt.secret);
    return token;
  }
}
