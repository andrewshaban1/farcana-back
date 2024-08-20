import { Router } from 'express';
import { HealthCheck } from './controllers/test.controller';
import { Login, Profile, Register } from './controllers/auth.controller';
import { e } from './utils/trycatch';
import { AuthMiddleware } from './middleware/auth.middleware';

export const routes = (router: Router) => {
  router.get('/', e(HealthCheck));

  router.post('/register', e(Register));
  router.post('/login', e(Login));
  router.get('/profile/:userId', AuthMiddleware, e(Profile));
};
