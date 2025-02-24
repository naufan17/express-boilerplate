import express, { Router } from 'express';
import { authorizeBearer } from '../middlewares/authorization.middleware';
import { profile, session, updateProfile, updatePassword } from '../controllers/account.controller';
import { updateProfileValidator, updatePasswordValidator } from '../validators/account.validator';

const router: Router = express.Router();

router.get('/profile', authorizeBearer, profile);
router.get('/session', authorizeBearer, session);
router.post('/update-profile', authorizeBearer, updateProfileValidator(), updateProfile);
router.post('/update-password', authorizeBearer, updatePasswordValidator(), updatePassword);

export default router;