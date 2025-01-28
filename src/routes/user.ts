import express, { Router } from 'express';
import { authenticateMiddleware } from '../middlewares/authenticate.middleware';
import { ReqUserProfile } from '../controllers/user.controller';

const router: Router = express.Router();

router.get('/profile', authenticateMiddleware, ReqUserProfile);

export default router;