const tablesService = require("./tables.service")
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
    console.log(data)
    res.json({ data });
}

async function update(req, res) {
    const updatedTable = {
        ...res.locals.table,
        ...req.body.data
    }

    const data = await tablesService.update(updatedTable)
    res.json({ data })
}

module.exports = {
    list: asyncErrorBoundary(list),
    update: [asyncErrorBoundary(tableExists), asyncErrorBoundary(update)]
}
