const reservationsService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

/* LIST does the following:
- reservations by date (if given)
- reservations that match input mobile # (if given)
- excludes finished reservations
*/
async function list(req, res) {
  let rDate = req.query.date;
  let rNumber = req.query.mobile_number;

  if (!rNumber) {
    data = await reservationsService.list(rDate);
  } else {
    data = await reservationsService.search(rNumber);
  }

  res.json({ data: data.filter((res) => res.status != "finished") });
}

// READ retrieves a reservation according to the ID in the query parameters
async function read(req, res) {
  const { reservation: data } = res.locals;
  res.json({ data });
}

// CREATE makes a new reservation
async function create(req, res) {
  const data = await reservationsService.create(req.body.data);

  res.status(201).json({ data });
}

// UPDATE handles a change to an existing reservation's properties that ARE NOT the status
async function update(req, res) {
  const updatedRes = {
    ...res.locals.reservation,
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const data = await reservationsService.update(updatedRes);
  res.json({ data });
}

// NEWSTATUS handles a change to the reservation's status
async function newStatus(req, res) {
  const updatedRes = {
    ...res.locals.reservation,
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };

  const data = await reservationsService.changeStatus(updatedRes);

  res.json({ data: { status: updatedRes.status } });
}

// Ensure the reservation exists --> used with read, update, & newStatus
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

// Ensure a request has all properties present --> used with create & update
const hasRequiredProperties = hasProperties(
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people"
);

// Ensure all properties are filled with data --> used with create & update
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

// Ensure a reservation's date is an actual date --> used with create & update
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

// Ensure a reservation is made for a future date --> used with create
function isDateInPast(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;

  const resDate = new Date(reservation_date);
  const threshhold = new Date()

  // || resDate.toUTCString().slice(0, 16) === threshhold.toUTCString().slice(0, 16)

  if (resDate.valueOf() <= threshhold.valueOf()) {
    return next({
      status: 400,
      message: "Reservations can only be made for a future date.",
    });
  }
  next();
}

// Ensure a reservation's time is an actual time --> used with create & update
function timeIsTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;

  let timeFormat = /^\d{1,2}:\d{2}([ap]m)?$/;

  if (reservation_time.match(timeFormat)) {
    return next();
  }
  next({
    status: 400,
    message: `${reservation_time} is not a valid reservation_time`,
  });
}

/* 
getMinutes: takes the reservation, open, and close times and returns numbers that can be compared to each other 
timeFrameisElligble: ensures the reservation time is inbetween open and close times
--> used with create
*/
function getMinutes(str) {
  let time = str.split(":");
  return time[0] * 60 + time[1] * 1;
}

function timeFrameIsElligble(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;

  let resTime = getMinutes(reservation_time);
  let openTime = getMinutes("10:30");
  let closeTime = getMinutes("21:30");

  if (resTime > openTime && resTime < closeTime) {
    return next();
  }

  next({
    status: 400,
    message: `Reservation time must be after 10:30am and before 9:30pm`,
  });
}

// Ensures a reservation cannot be made on a Tues --> used with create
function isRestaurantOpen(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;

  let fullResDate = new Date(reservation_date);

  if (fullResDate.getDay() !== 1) {
    return next();
  }
  next({
    status: 400,
    message: "Restaurant is closed on Tuesdays.",
  });
}

// Ensures that "people" is an actual number --> used with update & create
function peopleIsANumber(req, res, next) {
  const {
    data: { people },
  } = req.body;

  if (typeof people === "number") {
    return next();
  }
  next({
    status: 400,
    message: "Reservation must have valid number of people.",
  });
}

// Ensures a created reservation will only have a status of "booked" --> used with create
async function invalidStatusCreated(req, res, next) {
  const {
    data: { status },
  } = req.body;

  if (status === "seated" || status === "finished") {
    return next({
      status: 400,
      message: "Reservation cannot have a status of seated or finished.",
    });
  }
  next();
}

// Blocks updates to a finished reservation --> used with newStatus
async function cannotUpdateFinishedRes(req, res, next) {
  const reservation = await reservationsService.read(req.params.reservation_id);

  if (reservation.status === "finished") {
    return next({
      status: 400,
      message: "A finished reservation cannot be updated",
    });
  }
  next();
}

// Ensures that a status must be defined --> used with newStatus
function statusPropertyExists(req, res, next) {
  const {
    data: { status },
  } = req.body;

  if (status === "unknown") {
    return next({
      status: 400,
      message: `Reservation status cannot be unknown.`,
    });
  }
  next();
}

/* 
validStatus: defines the only values a status can have 
statusIsValid: ensures the request only has the valid values
--> used with newStatus 
*/
const validStatus = ["booked", "seated", "finished", "cancelled"];

function statusIsValid(req, res, next) {
  const {
    data: { status },
  } = req.body;

  if (validStatus.includes(status)) {
    return next();
  }
  next({
    status: 400,
    message: "Status is not valid",
  });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExists),
    hasRequiredProperties,
    dataExists,
    dateIsDate,
    peopleIsANumber,
    timeIsTime,
    asyncErrorBoundary(update),
  ],
  create: [
    hasRequiredProperties,
    dataExists,
    dateIsDate,
    isRestaurantOpen,
    peopleIsANumber,
    timeIsTime,
    isDateInPast,
    timeFrameIsElligble,
    invalidStatusCreated,
    asyncErrorBoundary(create),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(cannotUpdateFinishedRes),
    statusPropertyExists,
    statusIsValid,
    asyncErrorBoundary(newStatus),
  ],
};
