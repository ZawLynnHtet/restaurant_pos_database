module.exports = (app) => {
  const bills = require("../controller/billController");
  var router = require("express").Router();

  router.route("/").get(bills.getAllBill);
  // router.route("/daily").get(bills.getIncomeByDaily);
  router.route("/monthly").get(bills.getIncomeByMonthly);
  router.route("/each-month").get(bills.getIncomeByEachMonth);
  router.route("/date").get(bills.getIncomeByEachDay);
  router.route("/weekly").get(bills.getIncomeByWeekly);
  router
    .route("/:bid")
    .get(bills.getOneWithBillId)
    .patch(bills.editOneWithBillId)
    .delete(bills.deleteOneWithBillId);

  app.use("/api/v1/bills", router);
};
