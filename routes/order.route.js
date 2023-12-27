module.exports = (app) => {
  const orders = require("../controller/orderController");
  const bills = require("../controller/billController");

  var router = require("express").Router();

  router.post("/", orders.create).get("/", orders.findAll).delete("/", orders.deleteAll);

  router.route('/table/:tid').get(orders.getAllByTableId);
  router.route("/:id/bills").post(bills.create).get(bills.getAllWithOid).delete(bills.deleteAllWithOrderId);

  router.get("/:id", orders.findOne).delete("/:id", orders.delete).patch("/:id", orders.update);

  app.use("/api/v1/orders", router);
};