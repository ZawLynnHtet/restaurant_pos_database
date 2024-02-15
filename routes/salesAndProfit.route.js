module.exports = (app) => {
  const salesAndProfit = require("../utils/getEachDayData");
  var router = require("express").Router();

  router.get("/:food_name?", salesAndProfit.getEachDayData);
  app.use("/api/v1/sales-and-profit", router);
};
