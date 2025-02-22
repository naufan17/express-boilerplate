import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('sessions', (table) => {
    table.uuid('id').primary();
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.string('ip_address', 128).notNullable();
    table.string('user_agent', 255).notNullable();
    table.timestamp('login_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('last_active_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('expires_at').notNullable();
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('sessions');
}

