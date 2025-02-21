import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { responseUnauthorized } from "../../../helper/responseBody";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: { id: string }, info?: { message: string }) => {
    if(err || !user) return responseUnauthorized(res, info?.message || 'Access token is invalid');

    req.user = user;
    next();
  })(req, res, next);
}

export const authenticateCookie = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('cookie', { session: false }, (err: Error, user: { id: string }, info?: { message: string }) => {
    if(err || !user) return responseUnauthorized(res, info?.message || 'Refresh token is invalid');

    req.user = user;
    next();
  })(req, res, next);
}