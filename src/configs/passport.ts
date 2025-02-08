/* eslint-disable @typescript-eslint/no-explicit-any */
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { authenticateUser } from '../services/auth.service';
import User from '../models/user.model';
import config from './config';

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (
    email: string, 
    password: string, 
    done: any
  ): Promise<void> => {
    try {
      const user: User | null = await authenticateUser(email, password);
      if (!user) return done(null, false, { message: 'Invalid email or password' });

      return done(null, user);
    } catch (error) {
      console.log(error);
      return done(error);
    }
  })
);

passport.use(
  new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: config.JWTSecretKey,
  }, async (
    payload: any, 
    done: any
  ): Promise<void> => {
    if (payload.sub === undefined) return done(null, false, { message: 'Invalid token' });
    
    return done(null, { id: payload.sub });
  })
);

export default passport;