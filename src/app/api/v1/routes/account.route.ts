import express, { Router } from 'express';
import { authorizeBearer } from '../middlewares/authorization.middleware';
import { updateProfileValidator, updatePasswordValidator } from '../validators/account.validator';
import { AccountController } from '../controllers/account.controller';

const router: Router = express.Router();
const accountController = AccountController();

router.get('/profile', authorizeBearer, accountController.profileUser);
router.get('/session', authorizeBearer, accountController.sessionUser);
router.post('/update-profile', authorizeBearer, updateProfileValidator(), accountController.updateProfile);
router.post('/update-password', authorizeBearer, updatePasswordValidator(), accountController.updatePassword);

export default router;