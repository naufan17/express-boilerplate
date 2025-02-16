import express, { Router } from 'express';
import { authenticateJwt } from '../api/middlewares/authentication.middleware';
import { profile, updateProfile, updatePassword } from '../api/controllers/account.controller';
import { updateProfileValidator, updatePasswordValidator } from '../validators/account.validator';

const router: Router = express.Router();

router.get('/profile', authenticateJwt, profile);
router.post('/update-profile', authenticateJwt, updateProfileValidator(), updateProfile);
router.post('/update-password', authenticateJwt, updatePasswordValidator(), updatePassword);

export default router;