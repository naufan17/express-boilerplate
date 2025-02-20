import Session from "../models/session.model";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (userId: string, ipAddress: string, userAgent: string, expiresAt: Date): Promise<Session> => {
  const id: string = uuidv4();
  
  return await Session
    .query()
    .insert({
      id,
      userId,
      ipAddress,
      userAgent,
      expiresAt
    }).returning('*');
};

export const findSessionById = async (id: string): Promise<Session | undefined> => {
  return await Session
    .query()
    .select("id", "user_id", "ip_address", "user_agent", "login_at", "last_active_at", "expires_at")
    .where("id", id)
    .first();
};

export const updateLastActive = async (id: string, lastActiveAt: Date): Promise<Session | undefined> => {
  const updatedSessions = await Session
    .query()
    .where("id", id)
    .update({
      lastActiveAt
    }).returning("*");

  return updatedSessions[0];
};

export const endSession = async (id: string): Promise<Session | undefined> => {
  const endSessions = await Session
    .query()
    .where("id", id)
    .update({
      lastActiveAt: new Date(),
      expiresAt: new Date()
    }).returning("*");

  return endSessions[0];
};