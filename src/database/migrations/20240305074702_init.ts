import type { Knex } from 'knex';
import {
  AbstractColumn,
  CommonColumn,
} from '../../common/abstract/abstract.column';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('users', function (table) {
      AbstractColumn(table, knex);
      table.string('identifier').nullable();
      table.string('password').nullable();
      table.string('type').nullable();
      table.tinyint('isActive').defaultTo(1);
      table.tinyint('verified').defaultTo(0);
    })
    .createTable('roles', function (table) {
      AbstractColumn(table, knex);
      table.string('name').nullable();
      table.specificType('permissions', 'text[]').nullable();
    })
    .createTable('user_role', function (table) {
      table.uuid('id').primary().defaultTo(knex.fn.uuid());
      table.uuid('userId').unsigned().references('id').inTable('users');
      table.uuid('roleId').unsigned().references('id').inTable('roles');
    })
    .createTable('customers', function (table) {
      AbstractColumn(table, knex);
      CommonColumn(table, knex);
      table.uuid('userId').unsigned().references('id').inTable('users');
    })
    .createTable('administrators', function (table) {
      AbstractColumn(table, knex);
      CommonColumn(table, knex);
      table.uuid('userId').unsigned().references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('user_role')
    .dropTable('administrators')
    .dropTable('customers')
    .dropTable('users')
    .dropTable('roles');
}
