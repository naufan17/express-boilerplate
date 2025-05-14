/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../models/user.model';
import Session from '../models/session.model';
import logger from '../../../config/logger';
import { responseInternalServerError, responseNotFound, responseOk, responseBadRequest } from '../../../helper/responseBody';
import { userRepository } from '../repositories/user.repository';
import { sessionRepository } from '../repositories/session.repository';
import { formattedSession } from '../../../type/session';
import { formattedUser } from '../../../type/user';

export const accountController = () => {
  const profileUser = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
  
    try {
      const foundUser: User | undefined = await userRepository().findById(user.id);
      if (!foundUser) return responseNotFound(res, 'User not found');
  
      const formattedUser: formattedUser = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phoneNumber: foundUser.phone_number,
        address: foundUser.address,
        profilePicture: foundUser.profile_picture,
        isVerified: foundUser.is_verified,
      };
  
      return responseOk(res, 'User profile found', formattedUser);
    } catch (error) {
      logger.error(error);
      console.error(error);
      
      return responseInternalServerError(res, 'Error getting user profile');
    }
  }
  
  const sessionUser = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
  
    try {
      const sessions: Session[] | undefined = await sessionRepository().findByUserId(user.id);
      if (!sessions) return responseNotFound(res, 'User session not found');
  
      const formattedSession: formattedSession[] = sessions.map(session => ({
        id: session.id,
        userId: session.user_id,
        ipAddress: session.ip_address,
        userAgent: session.user_agent,
        status: session.expires_at > new Date() ? "active" : "expired",
        loginAt: session.login_at,
        lastActiveAt: session.last_active_at,
        expiresAt: session.expires_at,
      }));  
      
      return responseOk(res, 'User session found', formattedSession);
    } catch (error) {
      logger.error(error);
      console.error(error);

      return responseInternalServerError(res, 'Error getting user session');
    }
  }
  
  const updateProfile = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
    const { name, email, phoneNumber, address } = req.body;
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    try {
      const updatedUser: User | undefined = await userRepository().updateProfile(user.id, name, email, phoneNumber, address);
      if (!updatedUser) return responseNotFound(res, 'User not found');
  
      return responseOk(res, 'User profile updated');
    } catch (error) {
      logger.error(error);
      console.error(error);

      return responseInternalServerError(res, 'Error updating user profile');
    }
  }
  
  const updatePassword = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
    const { password } = req.body;
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    try {
      const hashedPassword: string = await bcrypt.hash(password, 10);
      if (!hashedPassword) return responseInternalServerError(res, 'Error hashing password');
  
      const updatedUser: User | undefined = await userRepository().updatePassword(user.id, hashedPassword);
      if (!updatedUser) return responseNotFound(res, 'User not found');
  
      return responseOk(res, 'User password updated');
    } catch (error) {
      logger.error(error);
      console.error(error);

      return responseInternalServerError(res, 'Error updating user password');
    }
  }

  return {
    profileUser,
    sessionUser,
    updateProfile,
    updatePassword
  }
};