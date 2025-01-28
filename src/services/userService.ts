import User from "../models/userModel";
import { findUserById } from "../repositories/userRepository";

export const userProfile = async (
  id: string
): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserById(id);
    if (!user) return null;

    return user;  
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user profile");
  }
};