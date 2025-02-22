import User from "../models/user.model";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (name: string, email: string, password: string): Promise<User> => {
  return await User
    .query()
    .insert({
      id: uuidv4(),
      name,
      email,
      password,
    }).returning('*');
};

export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return await User
    .query()
    .select("id", "email", "password")
    .where("email", email)
    .first();
};

export const findUserById = async (id: string): Promise<User | undefined> => {
  return await User
    .query()
    .select("id", "name", "email")
    .where("id", id)
    .first();
};

export const updateProfile = async (id: string, name: string, email: string): Promise<User> => {
  const user = await User
    .query()
    .where("id", id)
    .update({
      name,
      email,
    })
    .returning("*");

  return user[0];
};

export const updatePassword = async (id: string, password: string): Promise<User> => {
  const user = await User
    .query()
    .where("id", id)
    .update({
      password,
    })
    .returning("*");
    
  return user[0];
};