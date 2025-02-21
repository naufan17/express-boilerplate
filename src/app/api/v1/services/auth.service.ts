import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import User from "../models/user.model";
import { generateJWTAccess, generateJWTRefresh, verifyTJWTRefresh } from "../../../util/jwt";
import { createSession, updateLastActive } from "../repositories/session.repository";
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
    throw new Error("Error creating user");
  }
}

export const loginUser = async (userId: string, ipAddress: string, userAgent: string): Promise<{ accessToken: AccessToken, refreshToken: RefreshToken } | null> => {
  const accessToken: AccessToken = generateJWTAccess({ sub: userId });
  const refreshToken: RefreshToken = generateJWTRefresh({ sub: userId });
  if (!accessToken || !refreshToken) return null;
  
  // const session: any = await createSession(userId, ipAddress, userAgent, new Date(refreshToken.expiresIn));
  // if (!session) return null;

  return { accessToken, refreshToken };
}

export const refreshAccessToken = async (refreshToken: string): Promise<AccessToken | null> => {
  const payload: { sub: string } = await verifyTJWTRefresh(refreshToken);
  if (!payload) return null;

  const accessToken: AccessToken = generateJWTAccess({ sub: payload.sub });
  if (!accessToken) return null;

  // const session: any = await updateLastActive(payload.sub, new Date());
  // if (!session) return null;

  return accessToken;
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const user: User | undefined = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
}