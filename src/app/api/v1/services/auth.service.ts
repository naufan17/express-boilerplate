import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Session from "../models/session.model";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { createSession, findSessionById, updateExpires, updateLastActive } from "../repositories/session.repository";
import { generateJWTAccess, generateJWTRefresh } from "../../../util/jwt";
import { AccessToken, RefreshToken } from "../../../type/token";

export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserByEmail(email);
    if (user) return null;

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: User = await createUser(name, email, hashedPassword);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("error creating user");
  }
}

export const loginUser = async (userId: string, ipAddress: string, userAgent: string): Promise<{ accessToken: AccessToken, refreshToken: RefreshToken } | null> => {
  try {    
    const endSessions: Session = await updateExpires(userId);
    if (!endSessions) return null;

    const accessToken: AccessToken = generateJWTAccess({ sub: userId });

    const newSession: Session = await createSession(userId, ipAddress, userAgent);
    if (!newSession) return null;

    const refreshToken: RefreshToken = generateJWTRefresh({ sub: newSession.id });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error("error logging in user");
  }
}

export const refreshAccessToken = async (sessionId: string): Promise<AccessToken | null> => {
  try {
    const session: Session | undefined = await findSessionById(sessionId);
    if (!session || session.expires_at < new Date()) return null;

    const updateSession: Session = await updateLastActive(sessionId);
    if (!updateSession) return null;

    const accessToken: AccessToken = generateJWTAccess({ sub: session.user_id });  
  
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error("error refreshing access token");    
  }
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserByEmail(email);
    if (!user) return null;

    const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("error authenticating user");
  }
}