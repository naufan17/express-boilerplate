/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import config from '../configs/config';

export const generateToken = (payload: JwtPayload): { 
  accessToken: string; 
  expiresIn: number | undefined; 
  tokenType: string 
} => {
  const secretToken: string = config.JWT_SECRET_KEY ;
  const expiredToken: number = Number(config.JWT_EXPIRED_IN);
  const options: SignOptions = { expiresIn: expiredToken, algorithm: 'HS256' };
  const token = jwt.sign(payload, secretToken, options);

  return {
    accessToken: token,
    expiresIn: Date.now() + expiredToken,
    tokenType: 'Bearer'
  };
};

export const verifyToken = (token: string): any => {
  const secretToken: string = process.env.JWT_SECRET_KEY || '';
  const options: VerifyOptions = { ignoreExpiration: false }
  
  return jwt.verify(token, secretToken, options);
};