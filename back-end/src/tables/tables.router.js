const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed")

router.route("/").get(controller.list).post(controller.create).all(methodNotAllowed)
router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.delete).all(methodNotAllowed);
// router.route("reservations/:reservation_id/status").put(controller.update).delete(controller.delete)

module.exports = router;
