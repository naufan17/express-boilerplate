/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import Session from '../models/session.model';
import config from '../../../config/config';
import logger from '../../../config/logger';
import { responseBadRequest, responseConflict, responseCreated, responseInternalServerError, responseOk, responseUnauthorized } from '../../../helper/responseBody';
import { userRepository } from '../repositories/user.repository';
import { sessionRepository } from '../repositories/session.repository';
import { generateJWTAccess, generateJWTRefresh } from '../../../util/jwt';
import { setCookie } from '../../../helper/setCookie';
import { AccessToken, RefreshToken } from '../../../type/token';

export const authController = () => {
  const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    try {
      const existingUser: User | undefined = await userRepository().findByEmail(email);
      if (existingUser) return responseConflict(res, 'User already exists');

      const hashedPassword: string = await bcrypt.hash(password, 10);
      if (!hashedPassword) return responseInternalServerError(res, 'Error hashing password');

      const createdUser: User | undefined = await userRepository().create(name, email, hashedPassword);
      if (!createdUser) return responseInternalServerError(res, 'Error creating user');

      return responseCreated(res, 'User created successfully');
    } catch (error) {
      logger.error(error);
      console.error(error);

      return responseInternalServerError(res, 'Error creating user');
    }
  };
  
  const loginUser = async (req: Request, res: Response): Promise<void> => {
    const ipAddress: string = req.ip || '';
    const userAgent: string = req.get('User-Agent') || '';
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    passport.authenticate('local', { session: false }, async (err: Error, user: User, info?: { message: string }) => {
      if(err || !user) return responseUnauthorized(res, info?.message || 'Invalid email or password');
  
      try {
        const updatedSession: Session[] | undefined = await sessionRepository().updateExpires(user.id);
        if (!updatedSession) return responseInternalServerError(res, 'Error updating session');
          
        const newSession: Session | undefined = await sessionRepository().create(user.id, ipAddress, userAgent);
        if (!newSession) return responseInternalServerError(res, 'Error creating session');
    
        const accessToken: AccessToken = generateJWTAccess({ sub: user.id });
        const refreshToken: RefreshToken = generateJWTRefresh({ sub: newSession.id });
  
        setCookie(res, 'refreshToken', refreshToken.refreshToken, {
          maxAge: Number(config.JWTRefreshExpiredIn),
          expires: new Date(Date.now() + Number(config.JWTRefreshExpiredIn))
        });
  
        return responseOk(res, 'Login successfull', accessToken);
      } catch (error) {
        logger.error(error);
        console.error(error);

        return responseInternalServerError(res, 'Error logging in user');
      }    
    })(req, res);
  };
  
  const refreshAccessToken = async (req: Request | any, res: Response): Promise<void> => {
    const { session }: { session: { id: string } } = req;

    try {
      const existingSession: Session | undefined = await sessionRepository().findById(session.id);
      if (!existingSession || existingSession.expires_at < new Date()) return responseUnauthorized(res, 'Session expired');

      const updatedSession: Session | undefined = await sessionRepository().updateLastActive(existingSession.id);
      if (!updatedSession) return responseInternalServerError(res, 'Error updating session');

      const accessToken: AccessToken = generateJWTAccess({ sub: existingSession.user_id });  

      return responseOk(res, 'Access token refreshed', accessToken);
    } catch (error) {
      logger.error(error);
      console.error(error);

      return responseInternalServerError(res, 'Error refreshing access token');
    }    
  };
  
  const logoutUser = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
  
    try {
      const updatedSession: Session[] | undefined = await sessionRepository().updateExpires(user.id);
      if (!updatedSession) return responseInternalServerError(res, 'Error updating session');
  
      res.clearCookie('refreshToken');
      return responseOk(res, 'User logged out');
    } catch (error) {
      logger.error(error);
      console.error(error);
      
      return responseInternalServerError(res, 'Error logging out user');
    }    
  };

  return {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser
  };
};