/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction } from "express";
import { handleUnauthorized } from "../helpers/responseHelper";
import { verifyToken } from "../utils/jwt";

export const authenticateMiddleware = async (req: Request | any, res: Response, next: NextFunction) => {
  const token: string | undefined = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return handleUnauthorized(res, 'Access token not found');
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    return handleUnauthorized(res, 'Invalid access token');
  }
}