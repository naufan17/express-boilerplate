import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { register, login, refresh, logout } from '../controllers/auth.controller';
import { authorizeCookie, authorizeBearer } from '../middlewares/authorization.middleware';

const router: Router = express.Router();

router.post('/register', registerValidator(), register);
router.post('/login', loginValidator(), login);
router.get('/refresh', authorizeCookie, refresh);
router.get('/logout', authorizeBearer, authorizeCookie, logout);

export default router;