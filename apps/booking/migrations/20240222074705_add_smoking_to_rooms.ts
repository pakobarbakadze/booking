import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('rooms', function (table) {
    table.boolean('smoking').defaultTo(false);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('rooms', function (table) {
    table.dropColumn('smoking');
  });
}
