const router = require("express").Router();
const controller = require("./tables.controller");

router.route("/").get(controller.list).post(controller.create);
router
  .route("/:table_id/seat")
  .put(controller.update)
  .delete(controller.delete);
// router.route("reservations/:reservation_id/status").put(controller.update).delete(controller.delete)

module.exports = router;
