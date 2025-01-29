import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { handleUnauthorized } from "../helpers/response.helper";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: { id: string }) => {
    if(err || !user) return handleUnauthorized(res, 'Access token is invalid');

    req.user = user;
    next();
  })(req, res, next);
}