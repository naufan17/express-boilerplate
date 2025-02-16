import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export async function seed(knex: Knex): Promise<void> {
    await knex("users").del();

    await knex("users").insert([
        { id: uuidv4(), name: "John Doe", email: "john@example.com", password: await bcrypt.hash("password", 10) },
        { id: uuidv4(), name: "Jane Doe", email: "jane@example.com", password: await bcrypt.hash("password", 10) },
        { id: uuidv4(), name: "Bob Smith", email: "bob@example.com", password: await bcrypt.hash("password", 10) },
        { id: uuidv4(), name: "Alice Johnson", email: "alice@example.com", password: await bcrypt.hash("password", 10) },
        { id: uuidv4(), name: "Charlie Brown", email: "charlie@example.com", password: await bcrypt.hash("password", 10) },
    ]);
};
