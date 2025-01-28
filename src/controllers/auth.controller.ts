import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleBadRequest, handleConflict, handleCreated, handleInternalServerError, handleOk, handleUnauthorized } from '../helpers/response.helper';
import { login, register } from '../services/auth.service';
import User from '../models/user.model';

export const ReqRegister = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()) return handleBadRequest(res, errors.array()[0].msg);

  try {
    const user: User | null = await register(name, email, password);
    if (!user) return handleConflict(res, 'User already exists');

    return handleCreated(res, 'User created successfully');
  } catch (error) {
    console.log(error);
    return handleInternalServerError(res, 'Error creating user');
  }
};

export const ReqLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()) return handleBadRequest(res, errors.array()[0].msg);

  try {
    const accessToken: { 
      accessToken: string; 
      expiresIn: number | undefined; 
      tokenType: string 
    } | null = await login(email, password);
    if (!accessToken) return handleUnauthorized(res, 'Invalid email or password');

    return handleOk(res, 'Login successful', accessToken);
  } catch (error) {
    console.log(error);
    return handleInternalServerError(res, 'Error logging in');
  }
};