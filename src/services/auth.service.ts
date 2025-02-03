import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { findByEmail, create } from "../repositories/user.repository";

export const registerUser = async (name: string, email: string, password: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findByEmail(email);
    if (user) return null;

    const hashedPassword: string = await bcrypt.hash(password, 10);
    const newUser: User = await create(name, email, hashedPassword);

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error("Error creating user");
  }
}

export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  const user: User | undefined = await findByEmail(email);
  if (!user) return null;

  const isPasswordValid: boolean = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return null;

  return user;
}