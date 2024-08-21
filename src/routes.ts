import { Router } from 'express';
import { HealthCheck } from './controllers/health.controller';
import { Login, Register } from './controllers/auth.controller';
import { e } from './utils/trycatch';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Profile } from './controllers/data.contorller';

const router = Router();
router.get('/', e(HealthCheck));

router.post('/register', e(Register));
router.post('/login', e(Login));
router.get('/profile/:userId', AuthMiddleware, e(Profile));

export default router;
