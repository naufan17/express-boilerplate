import { Response } from 'express';

export const setCookie = (
  res: Response, 
  name: string, 
  value: string, 
  options: {
    maxAge: number,
    expires: Date
  }
): void => {
  res.cookie(name, value, {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: 'strict',
    ...options   
  });
}