import User from "../models/user.model";
import { findUserById, updateProfile, updatePassword } from "../repositories/user.repository";

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

export const updateProfileUser = async (
  id: string, 
  name: string, 
  email: string
): Promise<User | null> => {
  try {
    const user: User | undefined = await updateProfile(id, name, email);
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user profile");
  }
}

export const updatePasswordUser = async (
  id: string, 
  password: string
): Promise<User | null> => {
  try {
    const user: User | undefined = await updatePassword(id, password);
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Error updating user password");
  }
}