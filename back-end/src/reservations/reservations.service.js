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

module.exports = {
  list,
  search,
  read,
};
