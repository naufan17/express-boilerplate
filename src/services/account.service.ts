import User from "../models/user.model";
import { findUserById } from "../repositories/user.repository";

export const profileUser = async (id: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserById(id);
    if (!user) return null;

    return user;  
  } catch (error) {
    console.log(error);
    throw new Error("Error getting user profile");
  }
};