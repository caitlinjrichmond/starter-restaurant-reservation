/**
 * List handler for reservation resources
 */

const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

async function list(req, res) {
  let rDate = req.query.date;
  let rNumber = req.query.mobile_number;

  if (!rNumber) {
    data = await reservationsService.list(rDate);
  } else {
    data = await reservationsService.search(rNumber);
  }

  res.json({ data });
}

async function reservationExists(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);
  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({
    status: 404,
    message: `Reservation ${req.params.reservation_id} cannot be found.`,
  });
}

async function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

// async function updateStatus(req, res) {
//   const updatedRes = {
//     data: {status: "cancelled"}
//   }
// }

async function update(req, res) {
  const updatedRes = {
    ...res.locals.reservation,
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const data = await reservationsService.update(updatedRes);
  res.json({ data });
}

async function create(req, res) {
  const data = await reservationsService.create(req.body.data);
  res.status(201).json({ data });
}

// function hasOnlyValidProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (!invalidFields) {
//     return next();
//   }
//   next({
//     status: 400,
//     message: `Invalid field(s): ${invalidFields.join(", ")}`
//   });
// }

function dataExists(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    },
  } = req.body;
  if (
    first_name &&
    last_name &&
    mobile_number &&
    reservation_date &&
    reservation_time &&
    people
  ) {
    return next();
  }
  next({
    status: 400,
    message: `Reservation must include a first_name, last_name, mobile_number, reservation_time, reservation_date, and a valid number of people.`,
  });
}

function isRestaurantOpen(req, res, next) {
  const {
    data: { reservation_date }
  } = req.body;

  let fullResDate = new Date(reservation_date);
  let dateDay = fullResDate.getDay();

  if (fullResDate.getDay() !== 1) {
    return next();
  } 
  next({
    status: 400,
    message: "Restaurant is closed on Tuesdays."
  })
}

function isDateInPast(req, res, next) {
  const { 
    data: {reservation_date}
  } = req.body;

  const resDate = new Date(reservation_date)
  const threshhold = new Date();

  if (resDate.setHours(0, 0, 0, 0) <= threshhold.setHours(0, 0, 0, 0)) {
    return next({
      status: 400,
      message: "Reservations can only be made for a future date."
    })
  }
  next()
}


function peopleIsANumber(req, res, next) {
  const {
    data: { people },
  } = req.body;
  if (typeof people == "number") {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must have valid number of people.",
  });
}

// function peopleIsNotZero(req, res, next) {
//   const {
//     data: { people },
//   } = req.body;
//   if (people != 0) {
//     return next();
//   }
//   next({
//     status: 400,
//     message: `People cannot be 0.`,
//   });
// }

function dateIsDate(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;

  let reservationDate = new Date(reservation_date);

  if (reservationDate instanceof Date && !isNaN(reservationDate)) {
    return next();
  }
  next({
    status: 400,
    message: `${reservationDate} is not a valid reservation_date`,
  });
}

function timeIsTime(req, res, next) {
  const { 
    data: {reservation_time}
  } = req.body;

  let timeFormat = /^\d{1,2}:\d{2}([ap]m)?$/;

  if (reservation_time.match(timeFormat)) {
    return next()
  }
  next({
    status: 400,
    message: `${reservation_time} is not a valid reservation_time`
  })
}

// function statusPropertyExists(req, res, next) {
//   const { data: { status } } = req.body;
//   if (status && status !== " ") {
//     return next();
//   }
//   next({
//     status: 400,
//     message: `Reservation status cannot be unknown.`
//   })
// }

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    dataExists,
    asyncErrorBoundary(read)
  ],
  update: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    dataExists,
    dateIsDate,
    peopleIsANumber,
    timeIsTime,
    asyncErrorBoundary(update)
  ],
  create: [
    hasRequiredProperties,
    dataExists,
    dateIsDate,
    isRestaurantOpen,
    peopleIsANumber,
    timeIsTime,
    isDateInPast,
    asyncErrorBoundary(create)
  ],
};
