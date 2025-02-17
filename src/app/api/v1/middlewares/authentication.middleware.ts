import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { responseUnauthorized } from "../../../helper/response";

export const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', { session: false }, (err: Error, user: { id: string }) => {
    if(err || !user) return responseUnauthorized(res, 'Access token is invalid');

    req.user = user;
    next();
  })(req, res, next);
}