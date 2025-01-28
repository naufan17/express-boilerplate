/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { handleInternalServerError, handleNotFound, handleOk } from '../helpers/responseHelper';
import { userProfile } from '../services/userService';
import User from '../models/userModel';

export const ReqUserProfile = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: any } = req;

  try {
    const userProfileData: User | null = await userProfile(user.sub);
    if(user === null) return handleNotFound(res, 'User not found');

    return handleOk(res, 'User profile found', userProfileData);
  } catch (error) {
    console.log(error);
    return handleInternalServerError(res, 'Error getting user profile');
  }
}