import passport from 'passport';
import bcrypt from 'bcryptjs';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as CookieStrategy } from 'passport-cookie';
import { userRepository } from '../api/v1/repositories/user.repository';
import { verifyTJWTRefresh } from '../util/jwt';
import User from '../api/v1/models/user.model';
import config from './config';

passport.use(
  new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (
    email: string, 
    password: string, 
    done: (error: unknown, user?: User | false, info?: { message: string }) => void
  ): Promise<void> => {
    try {
      const user: User | undefined =  await userRepository().findByEmail(email);
      if (!user) return done(null, false, { message: 'Invalid email' });

      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return done(null, false, { message: 'Invalid password' });
      
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
    secretOrKey: config.JWTAccessSecretKey,
  }, async (
    payload: { sub: string }, 
    done: (error: unknown, user?: { id: string } | false, info?: { message: string }) => void
  ): Promise<void> => {
    if (!payload.sub) return done(null, false, { message: 'Access token is invalid' });
    
    return done(null, { id: payload.sub });
  })
);

passport.use(
  new CookieStrategy({
    cookieName: 'refreshToken',
    signed: true,
  }, async (
    token: string,
    done: (error: unknown, session?: { id: string } | false, info?: { message: string }) => void
  ): Promise<void> => {
    const payload: { sub: string } = verifyTJWTRefresh(token);
    if (!payload.sub) return done(null, false, { message: 'Refresh token is invalid' });

    return done(null, { id: payload.sub });
  })
);

export default passport;