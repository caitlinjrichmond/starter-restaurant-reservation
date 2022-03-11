/**
 * List handler for reservation resources
 */

const reservationsService = require("./reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {


  let rDate = req.query.date;
  let rNumber = req.query.mobile_number;
 

  if (!rNumber) {
   data = await reservationsService.list(rDate)
  } else {
    data = await reservationsService.search(rNumber)
  }

  console.log(data)
  res.json({data});
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next()
  }
  next({status: 404, message: "Reservation cannot be found"})
}

async function status(req, res) {
  const {reservation: data } = res.locals;
  res.json({data});
}

async function updateStatus(req, res) {
  const updatedRes = {
    data: {status: "cancelled"}
  }
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(status)]
  // update: [asyncErrorBoundary(update), asyncErrorBoundary(updateStatus), asyncErrorBoundary(reservationExists)]
};
