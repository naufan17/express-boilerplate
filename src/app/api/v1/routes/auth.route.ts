import express, { Router } from 'express';
import { loginValidator, registerValidator } from '../validators/auth.validator';
import { register, login } from '../controllers/auth.controller';

const router: Router = express.Router();

router.post('/register', registerValidator(), register);
router.post('/login', loginValidator(), login);

export default router;