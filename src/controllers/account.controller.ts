/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { responseInternalServerError, responseNotFound, responseOk } from '../helpers/response.helper';
import { profileUser } from '../services/account.service';
import User from '../models/user.model';

export const profile = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: { id: string } } = req;

  try {
    const userProfileData: User | null = await profileUser(user.id);
    if(user === null) return responseNotFound(res, 'User not found');

    return responseOk(res, 'User profile found', userProfileData);
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'Error getting user profile');
  }
}