import passport from 'passport';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { handleBadRequest, handleConflict, handleCreated, handleInternalServerError, handleOk, handleUnauthorized } from '../helpers/response.helper';
import User from '../models/user.model';
import { register } from '../services/auth.service';
import { generateToken } from '../utils/jwt';

export const reqRegister = async (req: Request, res: Response): Promise<void> => {
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

export const reqLogin = async (req: Request, res: Response): Promise<void> => {
  passport.authenticate('local', { session: false }, async (err: Error, user: User) => {
    if(err || !user) return handleUnauthorized(res, 'Invalid email or password');

    const accessToken: { 
      accessToken: string; 
      expiresIn: number | undefined; 
      tokenType: string 
    } = generateToken({ sub: user.id });
    
    return handleOk(res, 'Login successful', accessToken);
  })(req, res);
};