import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { Strategy as CookieStrategy } from 'passport-cookie';
import { authenticateUser } from '../api/v1/services/auth.service';
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
      const user: User | null = await authenticateUser(email, password);
      if (user === null) return done(null, false, { message: 'invalid email or password' });

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
    if (!payload.sub) return done(null, false, { message: 'access token is invalid' });
    
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
    if (!payload.sub) return done(null, false, { message: 'refresh token is invalid' });

    return done(null, { id: payload.sub });
  })
);

export default passport;