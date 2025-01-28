import express, { Router, Request, Response } from 'express';
import { handleInternalServerError, handleNotFound, handleOk } from '../helpers/response.helper';
import authRoute from './auth';
import userRoute from './user';

const router: Router = express.Router();

router.use('/auth', authRoute);
router.use('/user', userRoute);

router.get('/', (req: Request, res: Response) => {
  return handleOk(res, 'Welcome to Express Rest API');
});

router.use((req: Request, res: Response) => {
  return handleNotFound(res, 'Route not found');
})

router.use((err: unknown, req: Request, res: Response) => {
  return handleInternalServerError(res, "Internal Server Error");
})

export default router;