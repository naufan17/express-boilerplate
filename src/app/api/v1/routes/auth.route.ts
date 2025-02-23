import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { register, login, refresh, logout } from '../controllers/auth.controller';
import { authenticateCookie, authenticateJwt } from '../middlewares/authentication.middleware';

const router: Router = express.Router();

router.post('/register', registerValidator(), register);
router.post('/login', loginValidator(), login);
router.get('/refresh', authenticateCookie, refresh);
router.get('/logout', authenticateJwt, authenticateCookie, logout);

export default router;