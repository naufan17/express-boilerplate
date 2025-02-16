import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name', 100).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('password', 100).notNullable();
    table.timestamps(true, true);
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

