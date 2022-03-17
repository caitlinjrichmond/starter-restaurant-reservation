const tablesService = require("./tables.service")
const reservationsService = require("../reservations/reservations.service")
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")


async function tableExists(req, res, next) {
    const table = await tablesService.read(req.params.tableId);
    if (table) {
        res.locals.table = table;
        return next();
    }
    next({ status: 404, message: `Table cannot be found.`})
}

function read(req, res) {
    const {table: data} = res.locals;
    res.json({ data });
}

async function list(req, res, next) {
    const data = await tablesService.list();
    res.json({ data });
}

async function create(req, res) {
    const data = await tablesService.create(req.body.data);
    res.status(201).json({data})
  }

async function update(req, res) {
    const updatedTable = {
        ...res.locals.table,
        ...req.body.data,
        table_id: res.locals.table.table_id,
        reservation_id: res.locals.table.reservation_id
    }

    const data = await tablesService.update(updatedTable)
    res.json({ data })
}

async function destroy(req, res) {
    const { table } = res.locals; 
    await tablesService.delete(table.table_id);
    res.sendStatus(404)
}


function dataExists(req, res, next) {
    const {
      data: { table_name, capacity, reservation_id }
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
    if (table_name.length > 1 && table_name != " ") {
      return next();
    }
    next({
      status: 400,
      message: `Table must have a valid table_name.`,
    });
  }


  function capacityIsValid(req, res, next) {
    const {
      data: { capacity },
    } = req.body;
    if (!isNaN(capacity)) {
      return next();
    }
    next({
      status: 400,
      message: `Table must have a valid capacity.`,
    });
  }

  // async function reservationExists(req, res, next) {
  //   const reservation = await reservationsService.read(req.params.reservation_id);
  //   if (reservation) {
  //     res.locals.reservation = reservation;
  //     return next();
  //   }
  //   next({
  //     status: 404,
  //     message: `Reservation ${req.params.reservation_id} cannot be found.`,
  //   });
  // }

module.exports = {
    list: asyncErrorBoundary(list),
    update: [dataExists, tableNameIsValid, asyncErrorBoundary(tableExists), asyncErrorBoundary(update)],
    create: [dataExists, tableNameIsValid, capacityIsValid, asyncErrorBoundary(create)],
    delete: [asyncErrorBoundary(tableExists), asyncErrorBoundary(destroy)]
}
