import User from "../models/userModel";
import { v4 as uuidv4 } from "uuid";

export const create = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  const id: string = uuidv4();

  return await User.query().insert({
    id,
    name,
    email,
    password,
  }).returning('*');
};

export const findByEmail = async (
  email: string
): Promise<User | undefined> => {
  return await User
    .query()
    .select("id", "email", "password")
    .where("email", email)
    .first();
};

export const findUserById = async (
  id: string
): Promise<User | undefined> => {
  return await User
    .query()
    .select("id", "name", "email")
    .where("id", id)
    .first();
};
