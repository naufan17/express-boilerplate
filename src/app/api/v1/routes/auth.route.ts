import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { authorizeCookie, authorizeBearer } from '../middlewares/authorization.middleware';
import { AuthController } from '../controllers/auth.controller';

const router: Router = express.Router();
const authController = AuthController();

router.post('/register', registerValidator(), authController.registerUser);
router.post('/login', loginValidator(), authController.loginUser);
router.get('/refresh', authorizeCookie, authController.refreshAccessToken);
router.get('/logout', authorizeBearer, authorizeCookie, authController.logoutUser);

export default router;