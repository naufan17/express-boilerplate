import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { register, login, refresh } from '../controllers/auth.controller';
import { authenticateCookie } from '../middlewares/authentication.middleware';

const router: Router = express.Router();

router.post('/register', registerValidator(), register);
router.post('/login', loginValidator(), login);
router.get('/refresh', authenticateCookie, refresh);

export default router;