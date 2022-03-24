const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// LIST all tables
async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

// CREATE a new table
async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

// UPDATE a table and assign a reservation_id
async function update(req, res) {
  const updatedTable = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id,
  };

  const data = await tablesService.update(updatedTable);
  res.json({ data });
}

// DELETE a table assignment
async function destroy(req, res) {
  const { table } = res.locals;
  await tablesService.delete(table);
  res.sendStatus(200);
}

// Ensures request has necessary properties present --> used with create
const hasRequiredProperties = hasProperties("table_name", "capacity");

// Ensures a request to update includes the reservation id --> used with update
const hasRequiredPropertiesforUpdate = hasProperties("reservation_id");

// Ensures a table exists with a given id --> used with update & delete
async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({
    status: 404,
    message: `Table ${req.params.table_id} cannot be found.`,
  });
}

// Ensures a table's name is not empty or only 1 char --> used with create
function tableNameIsValid(req, res, next) {
  const {
    data: { table_name },
  } = req.body;
  if (table_name.length === 1 || table_name === "") {
    return next({
      status: 400,
      message: `Table must have a valid table_name.`,
    });
  }
  next();
}

// Ensures a table's capacity is an actual number --> used with create
function capacityIsValid(req, res, next) {
  const {
    data: { capacity },
  } = req.body;
  if (typeof capacity == "number") {
    return next();
  }
  next({
    status: 400,
    message: `Table must have a valid capacity.`,
  });
}

// Checks that a valid reservation has been assigned to the table --> used with update
async function reservationExists(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;

  const reservation = await tablesService.findReservation(reservation_id);

  if (reservation) {
    return next();
  }
  next({
    status: 404,
    message: `${reservation_id} is not an existing reservation_id`,
  });
}

// Ensures a table with an already assigned reservation cannot have another assignment made to it --> used with update
async function tableIsOccupied(req, res, next) {
  const table = await tablesService.read(req.params.table_id);

  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "Table is occupied.",
  });
}

// Blocks deletion of a table that has a reservation assigned to it --> used with delete
async function doNotDeleteOccupiedTable(req, res, next) {
  const table = await tablesService.read(req.params.table_id);

  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "Table is not occupied.",
  });
}

// Checks that the reservation's number of people does not exceed table capacity --> used with update
async function sufficientCapacity(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;

  const reservation = await tablesService.findReservation(reservation_id);
  const table = await tablesService.read(req.params.table_id);

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "Table does not have sufficient capacity.",
    });
  }
  next();
}

// Ensures that one reservation cannot be assigned to more than one table --> used with update
async function tableAlreadySeated(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;

  const reservation = await tablesService.findReservation(reservation_id);

  if (reservation.status === "seated") {
    return next({
      status: 400,
      message: "Reservation has already been seated",
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  update: [
    hasRequiredPropertiesforUpdate,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(sufficientCapacity),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableAlreadySeated),
    asyncErrorBoundary(update),
  ],
  create: [
    hasRequiredProperties,
    tableNameIsValid,
    capacityIsValid,
    asyncErrorBoundary(create),
  ],
  delete: [
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(doNotDeleteOccupiedTable),
    asyncErrorBoundary(destroy),
  ],
};
