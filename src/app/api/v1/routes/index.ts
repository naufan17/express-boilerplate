import express, { Router } from 'express';
import { authorizeBearer, authorizeCookie } from '../middlewares/authorization.middleware';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { updatePasswordValidator, updateProfileValidator } from '../validators/account.validator';
import { authController } from '../controllers/auth.controller';
import { accountController } from '../controllers/account.controller';

const router: Router = express.Router();

router.post('/auth/register', registerValidator(), authController().registerUser);
router.post('/auth/login', loginValidator(), authController().loginUser);
router.get('/auth/refresh', authorizeCookie, authController().refreshAccessToken);
router.get('/auth/logout', authorizeBearer, authorizeCookie, authController().logoutUser);

router.get('/account/profile', authorizeBearer, accountController().profileUser);
router.get('/account/session', authorizeBearer, accountController().sessionUser);
router.post('/account/update-profile', authorizeBearer, updateProfileValidator(), accountController().updateProfile);
router.post('/account/update-password', authorizeBearer, updatePasswordValidator(), accountController().updatePassword);

export default router;