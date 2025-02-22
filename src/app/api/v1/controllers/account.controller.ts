/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { responseInternalServerError, responseNotFound, responseOk, responseBadRequest } from '../../../helper/responseBody';
import { profileUser, updateProfileUser, updatePasswordUser } from '../services/account.service';
import User from '../models/user.model';

export const profile = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: { id: string } } = req;

  try {
    const userProfileData: User | null = await profileUser(user.id);
    if(userProfileData === null) return responseNotFound(res, 'user not found');

    return responseOk(res, 'user profile found', userProfileData);
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'error getting user profile');
  }
}

export const updateProfile = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: { id: string } } = req;
  const { name, email } = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  try {
    const userProfileData: User | null =  await updateProfileUser(user.id, name, email);
    if(userProfileData === null) return responseNotFound(res, 'user not found');

    return responseOk(res, 'user profile updated');
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'error updating user profile');
  }
}

export const updatePassword = async (req: Request | any, res: Response): Promise<void> => {
  const { user }: { user: { id: string } } = req;
  const { password } = req.body;

  const errors = validationResult(req);
  if(!errors.isEmpty()) return responseBadRequest(res, errors.array()[0].msg);

  try {
    const userProfileData: User | null = await updatePasswordUser(user.id, password);
    if(userProfileData === null) return responseNotFound(res, 'user not found');

    return responseOk(res, 'user password updated');
  } catch (error) {
    console.log(error);
    return responseInternalServerError(res, 'error updating user password');
  }
}