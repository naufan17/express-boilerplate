/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload, SignOptions, VerifyOptions } from 'jsonwebtoken';
import config from '../config/config';

export const generateJWTAccess = (payload: JwtPayload): { 
  accessToken: string; 
  expiresIn: number; 
  tokenType: string 
} => {
  const secretToken: string = config.JWTAccessSecretKey ;
  const expiredToken: number = Number(config.JWTAccessExpiredIn);
  const options: SignOptions = { 
    expiresIn: expiredToken, 
    algorithm: 'HS256' 
  };
  const token: string = jwt.sign(payload, secretToken, options);

  return {
    accessToken: token,
    expiresIn: Date.now() + expiredToken,
    tokenType: 'Bearer'
  };
};

export const generateJWTRefresh = (payload: JwtPayload): { 
  refreshToken: string; 
  expiresIn: number; 
  tokenType: string 
} => {
  const secretToken: string = config.JWTRefreshSecretKey ;
  const expiredToken: number = Number(config.JWTRefreshExpiredIn);
  const options: SignOptions = { 
    expiresIn: expiredToken, 
    algorithm: 'HS256' 
  };
  const token: string = jwt.sign(payload, secretToken, options);

  return {
    refreshToken: token,
    expiresIn: Date.now() + expiredToken,
    tokenType: 'Bearer'
  };
};

export const verifyTJWTAccess = (token: string): any => {
  const secretToken: string = config.JWTAccessSecretKey;
  const options: VerifyOptions = { 
    ignoreExpiration: false 
  }
  
  return jwt.verify(token, secretToken, options);
};

export const verifyTJWTRefresh = (token: string): any => {
  const secretToken: string = config.JWTRefreshSecretKey;
  const options: VerifyOptions = { 
    ignoreExpiration: false 
  }
  
  return jwt.verify(token, secretToken, options);
};