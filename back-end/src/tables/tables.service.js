const knex = require("../db/connection");

// Retrieves tables ordered by name
function list() {
  return knex("tables").select("*").orderBy("table_name");
}

// Retrieves table that matches given id
function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

// Adds a new table data row to the database
function create(table) {
  return knex("tables")
    .insert(table)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

// Handles the updating of a table - when a table is assigned a reservation id, the reservation status is then updated
function update(updatedTable) {
  return knex("tables")
    .select("*")
    .where({ table_id: updatedTable.table_id })
    .update(updatedTable, "*")
    .then(() => {
      return knex("reservations")
        .where({ reservation_id: updatedTable.reservation_id })
        .update({ status: "seated" });
    });
}

// Changes a reservation status to "finished", deletes the table assignment
function destroy(table) {
  return knex("reservations")
    .where({ reservation_id: table.reservation_id })
    .update({ status: "finished" })
    .then(() => {
      return knex("tables")
        .where({ table_id: table.table_id })
        .update({ reservation_id: null });
    });
}

// Used to look up a reservation associated with a table
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
