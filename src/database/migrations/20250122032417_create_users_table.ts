import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name', 128).notNullable();
    table.string('email', 128).notNullable().unique();
    table.string('password', 255).notNullable();
    table.string('phone_number', 20).nullable();
    table.string('address', 255).nullable();
    table.string('profile_picture', 255).nullable();
    table.boolean('is_verified').notNullable().defaultTo(false);
    table.timestamps(true, true);
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

