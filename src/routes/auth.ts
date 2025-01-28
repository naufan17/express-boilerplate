import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { ReqLogin, ReqRegister } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerValidator(), ReqRegister);
router.post('/login', loginValidator(), ReqLogin);

export default router;