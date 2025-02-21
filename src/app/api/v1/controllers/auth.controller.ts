import passport from 'passport';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseBadRequest, responseConflict, responseCreated, responseInternalServerError, responseOk, responseUnauthorized } from '../../../helper/response';
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.service';
import { AccessToken, RefreshToken } from '../../../type/token';
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
  const ipAddress: string = req.ip || '';
  const userAgent: string = req.get('User-Agent') || '';
  const errors = validationResult(req);

  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  passport.authenticate('local', { session: false }, async (err: Error, user: User) => {
    if(err || !user) return responseUnauthorized(res, 'Invalid email or password');

    try {
      const tokens = await loginUser(user.id, ipAddress, userAgent);
      if (!tokens || !tokens.accessToken || !tokens.refreshToken) return responseInternalServerError(res, 'Error logging in user');

      const { accessToken, refreshToken } : { accessToken: AccessToken, refreshToken: RefreshToken } = tokens;

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

export const refresh = async (req: Request, res: Response): Promise<void> => {
  const refreshToken: string = req.signedCookies.refreshToken;
  if (!refreshToken) return responseUnauthorized(res, 'Refresh token not found');

  try {
    const accessToken: AccessToken | null = await refreshAccessToken(refreshToken);
    if (!accessToken) return responseInternalServerError(res, 'Error refreshing token');

    return responseOk(res, 'Token refreshed', accessToken);
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'Error refreshing token');
  }    
};