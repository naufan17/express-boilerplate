import express, { Router } from 'express';
import { authenticateJwt } from '../middlewares/authenticate.middleware';
import { profile } from '../controllers/account.controller';

const router: Router = express.Router();

router.get('/profile', authenticateJwt, profile);

export default router;