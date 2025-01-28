import express, { Router, Request, Response } from 'express';
import { handleInternalServerError, handleNotFound, handleOk } from '../helpers/responseHelper';
import { loginValidator, registerValidator } from '../validators/authValidator';
import { ReqLogin, ReqRegister } from '../controllers/authController';
import { authenticateMiddleware } from '../middlewares/authenticateMiddleware';
import { ReqUserProfile } from '../controllers/userController';

const router: Router = express.Router();

// Authencation route
router.post('/auth/register', registerValidator(), ReqRegister);
router.post('/auth/login', loginValidator(), ReqLogin);

// User route
router.get('/user/profile', authenticateMiddleware, ReqUserProfile);

router.get('/', (req: Request, res: Response) => {
  return handleOk(res, 'Welcome to Express API Boilerplate');
});

router.use((req: Request, res: Response) => {
  return handleNotFound(res, 'Route not found');
})

router.use((err: unknown, req: Request, res: Response) => {
  return handleInternalServerError(res, "Internal Server Error");
})

export default router;