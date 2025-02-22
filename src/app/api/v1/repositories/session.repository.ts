import config from "../../../config/config";
import Session from "../models/session.model";
import { v4 as uuidv4 } from "uuid";

export const createSession = async (userId: string, ipAddress: string, userAgent: string): Promise<Session> => {
  return await Session
    .query()
    .insert({
      id: uuidv4(),
      user_id: userId,
      ip_address: ipAddress,
      user_agent: userAgent,
      expires_at: new Date(Date.now() + Number(config.JWTRefreshExpiredIn))
    }).returning('*');
};

export const findSessionById = async (id: string): Promise<Session | undefined> => {
  return await Session
    .query()
    .select("id", "user_id", "expires_at")
    .where("id", id)
    .first();
};

export const findSessionByUserId = async (userId: string): Promise<Session[] | undefined> => {
  return await Session
    .query()
    .select("id", "ip_address", "user_agent", "login_at", "last_active_at", "expires_at")
    .where("user_id", userId)
    .orderBy("login_at", "desc");
};

export const updateLastActive = async (id: string): Promise<Session> => {
  const session = await Session
    .query()
    .where("id", id)
    .update({
      last_active_at: new Date()
    }).returning("*");

  return session[0];
};

export const updateExpires = async (userId: string): Promise<Session> => {
  const session = await Session
    .query()
    .where("user_id", userId)
    .update({
      expires_at: new Date()
    }).returning("*");

  return session[0];
};