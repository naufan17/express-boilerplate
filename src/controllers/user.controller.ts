/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { handleInternalServerError, handleNotFound, handleOk } from '../helpers/response.helper';
import { userProfile } from '../services/user.service';
import User from '../models/user.model';

export const reqUserProfile = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: { id: string } } = req;

  try {
    const userProfileData: User | null = await userProfile(user.id);
    if(user === null) return handleNotFound(res, 'User not found');

    return handleOk(res, 'User profile found', userProfileData);
  } catch (error) {
    console.log(error);
    return handleInternalServerError(res, 'Error getting user profile');
  }
}