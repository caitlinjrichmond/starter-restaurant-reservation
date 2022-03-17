const knex = require("../db/connection");

function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*");
}

function destroy(table_id) {
  return knex("tables").where({ table_id }).del();
}

function findReservation(resId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: resId })
    .first();
}

module.exports = {
  list,
  read,
  create,
  update,
  findReservation,
  delete: destroy,
};
