import express, { Router, Request, Response } from 'express';
import { responseInternalServerError, responseNotFound, responseOk } from '../../../helper/responseBody';
import authRoute from './auth.route';
import accountRoute from './account.route';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/account', accountRoute);

router.get('/', (req: Request, res: Response) => {
  return responseOk(res, 'Welcome to Express Rest API');
});

router.use((req: Request, res: Response) => {
  return responseNotFound(res, 'Route not found');
})

router.use((err: unknown, req: Request, res: Response) => {
  return responseInternalServerError(res, "Internal Server Error");
})

export default router;