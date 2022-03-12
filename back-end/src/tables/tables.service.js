const knex = require("../db/connection")

// function update(updatedRes) {
//   return knex("reservations")
//     .where({ reservation_id: updatedRes.reservation_id })
//     .update(updatedRes, "*");
// }

module.exports = {
    update
}