module.exports = (app) => {
  const orderDetails = require("../controller/orderdetailsController");

  var router = require("express").Router();

  router.post("/", orderDetails.create).get("/", orderDetails.findAll).delete("/", orderDetails.deleteAll);

  router.route('/order/:oid').get(orderDetails.findByOrderId);

  router.get("/:id", orderDetails.findOne).delete("/:id", orderDetails.delete).patch("/:id", orderDetails.update);

  app.use("/api/v1/orderdetails", router);
};