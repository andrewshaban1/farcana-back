import { Request } from 'express';
import { User } from '../entities/user.entity';

export interface UserRequest extends Request {
  user?: User;
}

export type UserRegister = {
  username: string;
  email: string;
  password_hash: string;
  data?: { data: string };
};
