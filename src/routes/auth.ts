import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { reqLogin, reqRegister } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerValidator(), reqRegister);
router.post('/login', loginValidator(), reqLogin);

export default router;