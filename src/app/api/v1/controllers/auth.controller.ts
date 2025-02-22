/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseBadRequest, responseConflict, responseCreated, responseInternalServerError, responseOk, responseUnauthorized } from '../../../helper/responseBody';
import { registerUser, loginUser, refreshAccessToken } from '../services/auth.service';
import { AccessToken, RefreshToken } from '../../../type/token';
import { setCookie } from '../../../helper/setCookie';
import User from '../models/user.model';
import config from '../../../config/config';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  try {
    const user: User | null = await registerUser(name, email, password);
    if (user === null) return responseConflict(res, 'user already exists');

    return responseCreated(res, 'user created successfully');
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'error creating user');
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const ipAddress: string = req.ip || '';
  const userAgent: string = req.get('User-Agent') || '';

  const errors = validationResult(req);
  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  passport.authenticate('local', { session: false }, async (err: Error, user: User, info?: { message: string }) => {
    if(err || !user) return responseUnauthorized(res, info?.message || 'invalid email or password');

    try {
      const tokens = await loginUser(user.id, ipAddress, userAgent);
      if (!tokens || !tokens.accessToken || !tokens.refreshToken) return responseInternalServerError(res, 'error logging in user');

      const { accessToken, refreshToken } : { accessToken: AccessToken, refreshToken: RefreshToken } = tokens;

      setCookie(res, 'refreshToken', refreshToken.refreshToken, {
        maxAge: Number(config.JWTRefreshExpiredIn),
        expires: new Date(Date.now() + Number(config.JWTRefreshExpiredIn))
      });

      return responseOk(res, 'login successful', accessToken);
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res, 'error logging in user');
    }    
  })(req, res);
};

export const refresh = async (req: Request | any, res: Response): Promise<void> => {
  const { session }: { session: { id: string } } = req;

  try {
    const accessToken: AccessToken | null = await refreshAccessToken(session.id);
    if (accessToken === null) return responseInternalServerError(res, 'error refreshing access token');

    return responseOk(res, 'access token refreshed', accessToken);
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'error refreshing access token');
  }    
};