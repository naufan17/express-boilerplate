import express, { Router } from 'express';
import { authenticateJwt } from '../middlewares/authenticate.middleware';
import { reqUserProfile } from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/profile', authenticateJwt, reqUserProfile);

export default router;