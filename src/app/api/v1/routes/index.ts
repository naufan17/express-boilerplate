import express, { Router } from 'express';
import authRoute from './auth.route';
import accountRoute from './account.route';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/account', accountRoute);

export default router;