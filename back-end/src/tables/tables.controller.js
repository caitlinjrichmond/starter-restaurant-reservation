const tablesService = require("./tables.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function update(req, res) {
  const updatedRes = {
    ...res.locals.reservation,
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,

  }

  const data = await reservationsService.update(updatedRes)
  res.json({data});
}

module.exports = {
    update: [asyncErrorBoundary(update)]
}