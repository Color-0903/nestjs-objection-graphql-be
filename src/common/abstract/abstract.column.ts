export function AbstractColumn(table: any, knex: any) {
  table.uuid('id').primary().defaultTo(knex.fn.uuid());
  table
    .dateTime('createdOnDate')
    .notNullable()
    .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
  table.string('createByUserId', 36).nullable();
  table.dateTime('lastModifiedOnDate').defaultTo(knex.fn.now());
  table.string('lastModifiedByUserId', 36).nullable();
  table.dateTime('deleteAt').defaultTo(null);
}

export function CommonColumn(table: any, knex: any) {
  table.string('fullName').nullable();
  table.string('phoneNumber').nullable();
  table.string('emailAddress').nullable();
  table.dateTime('dob').nullable();
}
