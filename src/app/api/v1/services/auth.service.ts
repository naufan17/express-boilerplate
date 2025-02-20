import bcrypt from "bcryptjs";
import { findUserByEmail, createUser } from "../repositories/user.repository";
import User from "../models/user.model";
import { generateJWTAccess, generateJWTRefresh } from "../../../util/jwt";

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

export const loginUser = async (userId: string): Promise<{ 
  accessToken: {
    accessToken: string; 
    expiresIn: number | undefined; 
    tokenType: string
  }, 
  refreshToken: {
    refreshToken: string; 
    expiresIn: number | undefined; 
    tokenType: string
  } 
}> => {
  const accessToken: { 
    accessToken: string; 
    expiresIn: number | undefined; 
    tokenType: string 
  } = generateJWTAccess({ sub: userId });

  const refreshToken: { 
    refreshToken: string; 
    expiresIn: number | undefined; 
    tokenType: string 
  } = generateJWTRefresh({ sub: userId });

  return { accessToken, refreshToken };
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const user: User | undefined = await findUserByEmail(email);
  if (!user) return null;

  const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
}