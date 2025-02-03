import passport from 'passport';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseBadRequest, responseConflict, responseCreated, responseInternalServerError, responseOk, responseUnauthorized } from '../helpers/response.helper';
import User from '../models/user.model';
import { registerUser } from '../services/auth.service';
import { generateToken } from '../utils/jwt';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);

  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  try {
    const user: User | null = await registerUser(name, email, password);
    if (!user) return responseConflict(res, 'User already exists');

    return responseCreated(res, 'User created successfully');
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'Error creating user');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  passport.authenticate('local', { session: false }, async (err: Error, user: User) => {
    if(err || !user) return responseUnauthorized(res, 'Invalid email or password');

    const accessToken: { 
      accessToken: string; 
      expiresIn: number | undefined; 
      tokenType: string 
    } = generateToken({ sub: user.id });
    
    return responseOk(res, 'Login successful', accessToken);
  })(req, res);
};