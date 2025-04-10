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
    })
    .returning('*');
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
    .select("id", "name", "email", "phone_number", "address", "profile_picture", "is_verified")
    .findById(id)
    .first();
};

export const updateProfile = async (id: string, name: string | undefined, email: string | undefined, phoneNumber: string | undefined, address: string | undefined): Promise<User | undefined> => {
  return User
    .query()
    .findById(id)
    .update({
      name,
      email,
      phone_number: phoneNumber,
      address,
    })
    .returning("*")
    .first();
};

export const updatePassword = async (id: string, password: string): Promise<User | undefined> => {
  return await User
    .query()
    .findById(id)
    .update({
      password,
    })
    .returning("*")
    .first();
};