/* eslint-disable @typescript-eslint/no-explicit-any */
import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Session from "../models/session.model";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import { createSession, updateLastActive } from "../repositories/session.repository";
import { generateJWTAccess, generateJWTRefresh, verifyTJWTRefresh } from "../../../util/jwt";
import { AccessToken, RefreshToken } from "../../../type/token";

export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserByEmail(email);
    if (!user) return null;

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: User = await createUser(name, email, hashedPassword);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}

export const loginUser = async (userId: string, ipAddress: string, userAgent: string): Promise<{ accessToken: AccessToken, refreshToken: RefreshToken } | null> => {
  try {
    const accessToken: AccessToken = generateJWTAccess({ sub: userId });
    const refreshToken: RefreshToken = generateJWTRefresh({ sub: userId });
    
    // const session: Session = await createSession(userId, ipAddress, userAgent, new Date(refreshToken.expiresIn));
    // if (!session) return null;
  
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new Error("Error logging in user");
  }
}

export const refreshAccessToken = async (userId: string): Promise<AccessToken | null> => {
  try {
    const accessToken: AccessToken = generateJWTAccess({ sub: userId });  
    // const session: Session = await updateLastActive(payload.sub, new Date());
    // if (!session) return null;
  
    return accessToken;
  } catch (error) {
    console.log(error);
    throw new Error("Error refreshing access token");    
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
    throw new Error("Error authenticating user");
  }
}