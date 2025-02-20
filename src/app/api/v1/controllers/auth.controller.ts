import passport from 'passport';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseBadRequest, responseConflict, responseCreated, responseInternalServerError, responseOk, responseUnauthorized } from '../../../helper/response';
import { registerUser, loginUser } from '../services/auth.service';
import User from '../models/user.model';
import config from '../../../config/config';

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
  const errors = validationResult(req);

  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  passport.authenticate('local', { session: false }, async (err: Error, user: User) => {
    if(err || !user) return responseUnauthorized(res, 'Invalid email or password');

    try {
      const { accessToken, refreshToken }: { 
        accessToken: { 
          accessToken: string; 
          expiresIn: number | undefined; 
          tokenType: string 
        }, 
        refreshToken: { 
          refreshToken: string; 
          expiresIn: number | undefined; 
          tokenType: string 
        } 
      } = await loginUser(user.id);
      if (!accessToken || !refreshToken) return responseInternalServerError(res, 'Error logging in user');

      res.cookie('refreshToken', refreshToken.refreshToken, { 
        httpOnly: true, 
        secure: true,
        signed: true, 
        sameSite: 'strict',
        maxAge: Number(config.JWTRefreshExpiredIn),
        expires: new Date(Date.now() + Number(config.JWTRefreshExpiredIn)) 
      });

      return responseOk(res, 'Login successful', accessToken);
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res, 'Error logging in user');
    }    
  })(req, res);
};