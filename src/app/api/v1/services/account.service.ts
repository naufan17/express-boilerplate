import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Session from "../models/session.model";
import { findUserById, updateProfile, updatePassword } from "../repositories/user.repository";
import { findSessionByUserId } from "../repositories/session.repository";
import { formattedSession } from "../../../type/session";

export const profileUser = async (id: string): Promise<User | null> => {
  try {
    const user: User | undefined = await findUserById(id);
    if (!user) return null;

    return user;  
  } catch (error) {
    console.log(error);
    throw new Error("error getting user profile");
  }
};

export const sessionUser = async (id: string): Promise<formattedSession[] | null> => {
  try {
    const sessions: Session[] | undefined = await findSessionByUserId(id);
    if (!sessions) return null;

    const formattedSession: formattedSession[] = sessions.map(session => ({
      id: session.id,
      user_id: session.user_id,
      ip_address: session.ip_address,
      user_agent: session.user_agent,
      status: session.expires_at > new Date() ? "active" : "expired",
      login_at: session.login_at,
      last_active_at: session.last_active_at,
      expires_at: session.expires_at,
    }));

    return formattedSession;
  } catch (error) {
    console.log(error);
    throw new Error("error getting user session");
  }
}
export const updateProfileUser = async (id: string, name: string, email: string): Promise<User | null> => {
  try {
    const user: User | undefined = await updateProfile(id, name, email);
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("error updating user profile");
  }
}

export const updatePasswordUser = async (id: string, password: string): Promise<User | null> => {
  try {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const user: User | undefined = await updatePassword(id, hashedPassword);
    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("error updating user password");
  }
}