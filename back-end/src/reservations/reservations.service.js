const knex = require("../db/connection");

// Retrieve reservations - either all reservations or those that match a given date & order by date
function list(resDate) {
  if (resDate) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: resDate })
      .orderBy("reservation_time");
  } else {
    return knex("reservations").select("*").orderBy("reservation_time");
  }
}

// Retrieves reservation that matches a given id
function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

// Retrieves a reservation that matches a given mobile # & orders by date
function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

// Handle the updating of reservation's data that is NOT the reservation status
function update(updatedRes) {
  return knex("reservations")
    .where({ reservation_id: updatedRes.reservation_id })
    .update(updatedRes, [
      "first_name",
      "last_name",
      "mobile_number",
      "people",
      "reservation_date",
      "reservation_time",
    ])
    .then((updatedRecords) => updatedRecords[0]);
}

// Handle updating of the status data of a reservation
function changeStatus(updatedRes) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: updatedRes.reservation_id })
    .update(updatedRes, "status")
    .then((updatedRecords) => updatedRecords[0]);
}

// Add a new reservation to the database
function create(reservation) {
  return knex("reservations")
    .insert(reservation)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

module.exports = {
  list,
  search,
  read,
  update,
  changeStatus,
  create,
};
