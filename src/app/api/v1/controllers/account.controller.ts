/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseInternalServerError, responseNotFound, responseOk, responseBadRequest } from '../../../helper/responseBody';
import User from '../models/user.model';
import { formattedSession } from '../../../type/session';
import { formattedUser } from '../../../type/user';
import { AccountService } from '../services/account.service';

const accountService = AccountService();

export const AccountController = () => {
  const profileUser = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
  
    try {
      const userProfile: formattedUser | null = await accountService.profileUser(user.id);
      if(userProfile === null) return responseNotFound(res, 'User not found');
  
      return responseOk(res, 'User profile found', userProfile);
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res, 'Error getting user profile');
    }
  }
  
  const sessionUser = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
  
    try {
      const userSession: formattedSession[] | null = await accountService.sessionUser(user.id);
      if(userSession === null) return responseNotFound(res, 'User session not found');
  
      return responseOk(res, 'User session found', userSession);
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res, 'Error getting user session');
    }
  }
  
  const updateProfile = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
    const { name, email, phoneNumber, address } = req.body;
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    try {
      const userProfileData: User | null =  await accountService.updateProfile(user.id, name, email, phoneNumber, address);
      if(userProfileData === null) return responseNotFound(res, 'User not found');
  
      return responseOk(res, 'User profile updated');
    } catch (error) {
      console.log(error);
      return responseInternalServerError(res, 'Error updating user profile');
    }
  }
  
  const updatePassword = async (req: Request | any, res: Response): Promise<void> => {
    const { user }: { user: { id: string } } = req;
    const { password } = req.body;
  
    const errors = validationResult(req);
    if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);
  
    try {
      const userProfileData: User | null = await accountService.updatePassword(user.id, password);
      if(userProfileData === null) return responseNotFound(res, 'User not found');
  
      return responseOk(res, 'User password updated');
    } catch (error) {
      console.log(error);
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