import bcrypt from "bcryptjs";
import User from "../models/user.model";
import Session from "../models/session.model";
import { findUserById, updateProfile, updatePassword } from "../repositories/user.repository";
import { findSessionByUserId } from "../repositories/session.repository";
import { formattedSession } from "../../../type/session";
import { formattedUser } from "../../../type/user";

export const profileUser = async (id: string): Promise<formattedUser | null> => {
  try {
    const user: User | undefined = await findUserById(id);
    if (!user) return null;

    const formattedUser: formattedUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phone_number,
      address: user.address,
      profilePicture: user.profile_picture,
      isVerified: user.is_verified,
    };

    return formattedUser;  
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
      userId: session.user_id,
      ipAddress: session.ip_address,
      userAgent: session.user_agent,
      status: session.expires_at > new Date() ? "active" : "expired",
      loginAt: session.login_at,
      lastActiveAt: session.last_active_at,
      expiresAt: session.expires_at,
    }));

    return formattedSession;
  } catch (error) {
    console.log(error);
    throw new Error("error getting user session");
  }
}

export const updateProfileUser = async (id: string, name: string | undefined, email: string | undefined, phoneNumber: string | undefined, address: string | undefined): Promise<User | null> => {
  try {
    const user: User | undefined = await updateProfile(id, name, email, phoneNumber, address);
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