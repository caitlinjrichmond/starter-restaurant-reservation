const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

const VALID_PROPERTIES = ["table_name", "capacity"];

const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasRequiredPropertiesforUpdate = hasProperties("reservation_id");

async function tableExists(req, res, next) {
  const table = await tablesService.read(req.params.table_id);
  if (table) {
    res.locals.table = table;
    return next();
  }
  next({ status: 404, message: `Table ${req.params.table_id} cannot be found.` });
}

function read(req, res) {
  const { table: data } = res.locals;
  res.json({ data });
}

async function list(req, res, next) {
  const data = await tablesService.list();
  res.json({ data });
}

async function create(req, res) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

async function update(req, res) {
  const updatedTable = {
    ...res.locals.table,
    ...req.body.data,
    table_id: res.locals.table.table_id,
    // reservation_id: res.locals.table.reservation_id
  };

  const data = await tablesService.update(updatedTable);
  res.json({ data });
}

// async function seatedStatus(req, res) {
//   const updatedTable = {
//     ...res.locals.table,
//     ...req.body.data,
//     table_id: res.locals.table.table_id
//   }

//   const data = await tablesService.changeStatusToSeated(updatedTable);

//   res.json({data})
// }

// OG destroy 
// async function destroy(req, res) {
//   const { table } = res.locals;
//   await tablesService.delete(table.table_id);
//   res.sendStatus(200);
// }

async function destroy(req, res) {
  const { table } = res.locals;
  await tablesService.delete(table);
  res.sendStatus(200);
}

function dataExists(req, res, next) {
  const {
    data: { table_name, capacity, reservation_id },
  } = req.body;
  if (table_name && capacity && reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: `Table must have a table_name, capacity, and reservation_id.`,
  });
}

function tableNameIsValid(req, res, next) {
  const {
    data: { table_name },
  } = req.body;
  if (table_name.length == 1 || table_name == "") {
    return next({
      status: 400,
      message: `Table must have a valid table_name.`,
    });
  }
  next();
}

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

async function tableIsOccupied(req, res, next) {
  // const {
  //   data: { table_id },
  // } = req.body;

  const table = await tablesService.read(req.params.table_id);

  if (!table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "Table is occupied.",
  });
}

async function doNotDeleteOccupiedTable(req, res, next) {
  // const {
  //   data: { table_id },
  // } = req.body;

  const table = await tablesService.read(req.params.table_id);

  if (table.reservation_id) {
    return next();
  }
  next({
    status: 400,
    message: "Table is not occupied.",
  });
}

async function sufficientCapacity(req, res, next) {
  const {
    data: { reservation_id },
  } = req.body;

  const reservation = await tablesService.findReservation(reservation_id);
  const table = await tablesService.read(req.params.table_id)

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: "Table does not have sufficient capacity.",
    });
  }
  next();
}

async function tableAlreadySeated(req, res, next) {
  const {
    data: {reservation_id}
  } = req.body;

  const reservation = await tablesService.findReservation(reservation_id);

  if (reservation.status == "seated") {
    return next({
      status: 400,
      message: "Reservation has already been seated"
    })
  }
  next();
}

// function statusPropertyExists(req, res, next) {
//   const { data: { status } } = req.body;
//   if (status == "unknown") {
//     return next({
//       status: 400,
//       message: `Reservation status cannot be unknown.`
//     });
//   }
//   next()
// }

// async function cannotUpdateFinishedRes(req, res,next) {
//   const reservation = await tablesService.findReservation(req.params.reservation_id)

//   if (reservation.status == "finished") {
//     return next({
//       status: 400,
//       message: "A finished reservation cannot be updated"
//     })
//   }
//   next();
// }

module.exports = {
  list: [asyncErrorBoundary(list)],
  update: [
    hasRequiredPropertiesforUpdate,
    asyncErrorBoundary(reservationExists),
    asyncErrorBoundary(sufficientCapacity),
    asyncErrorBoundary(tableIsOccupied),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(tableAlreadySeated),
    asyncErrorBoundary(update)
  ],
  create: [
    hasRequiredProperties,
    tableNameIsValid,
    capacityIsValid,
    asyncErrorBoundary(create)
  ],
  delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(doNotDeleteOccupiedTable), asyncErrorBoundary(destroy)],
};
