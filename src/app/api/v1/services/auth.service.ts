import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Session from "../models/session.model";
import { generateJWTAccess, generateJWTRefresh } from "../../../util/jwt";
import { AccessToken, RefreshToken } from "../../../type/token";
import { UserRepository } from "../repositories/user.repository";
import { SessionRepository } from "../repositories/session.repository";

const userRepository = UserRepository();
const sessionRepository = SessionRepository();

export const AuthService = () => {
  const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
    try {
      const user: User | undefined = await userRepository.findByEmail(email);
      if (user) return null;
  
      const hashedPassword: string = await bcrypt.hash(password, 10);
      const newUser: User = await userRepository.create(name, email, hashedPassword);
  
      return newUser;
    } catch (error) {
      console.log(error);
      throw new Error("error creating user");
    }
  }
  
  const loginUser = async (userId: string, ipAddress: string, userAgent: string): Promise<{ accessToken: AccessToken, refreshToken: RefreshToken } | null> => {
    try {    
      await sessionRepository.updateExpires(userId);
      
      const accessToken: AccessToken = generateJWTAccess({ sub: userId });
  
      const newSession: Session | undefined = await sessionRepository.create(userId, ipAddress, userAgent);
      if (!newSession) return null;
  
      const refreshToken: RefreshToken = generateJWTRefresh({ sub: newSession.id });
  
      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);
      throw new Error("error logging in user");
    }
  }
  
  const refreshAccessToken = async (sessionId: string): Promise<AccessToken | null> => {
    try {
      const session: Session | undefined = await sessionRepository.findById(sessionId);
      if (!session || session.expires_at < new Date()) return null;
  
      const updateSession: Session | undefined = await sessionRepository.updateLastActive(sessionId);
      if (!updateSession) return null;
  
      const accessToken: AccessToken = generateJWTAccess({ sub: session.user_id });  
    
      return accessToken;
    } catch (error) {
      console.log(error);
      throw new Error("error refreshing access token");    
    }
  }
  
  const logoutUser = async (userId: string): Promise<boolean> => {
    try {
      await sessionRepository.updateExpires(userId);
      return true;
    } catch (error) {
      console.log(error);
      throw new Error("error logging out user");
    }
  }
  
  const authenticateUser = async (email: string, password: string): Promise<User | null> => {
    try {
      const user: User | undefined = await userRepository.findByEmail(email);
      if (!user) return null;
  
      const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) return null;
  
      return user;
    } catch (error) {
      console.log(error);
      throw new Error("error authenticating user");
    }
  }
  
  return {
    registerUser,
    loginUser,
    logoutUser,
    authenticateUser,
    refreshAccessToken
  }
}