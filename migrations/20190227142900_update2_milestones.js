
exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.foreign('famous_person_id').references('id').inTable('famous_people');
    })
  ])
};

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.table('milestones', function (table) {
      table.dropForeign('famous_person_id')
    })
  ])
};