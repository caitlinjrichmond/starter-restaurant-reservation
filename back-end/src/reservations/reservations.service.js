const knex = require("../db/connection");

function list(resDate) {
  // if (resDate) {
  //   resDate = `${resDate}T07:00:00.000Z`
  // }

  if (resDate) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: resDate })
      .orderBy("reservation_time");
  } else {
    return knex("reservations").select("*").orderBy("reservation_time");
  }
}

function read(reservation_id) {
  return knex("reservations").select("*").where({ reservation_id }).first();
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

function update(updatedRes) {
  return knex("reservations")
    .where({ reservation_id: updatedRes.reservation_id })
    .update(updatedRes, "*");
}

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
  create,
};
