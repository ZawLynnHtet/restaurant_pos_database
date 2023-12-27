module.exports = (app) => {
  const tables = require("../controller/tablesController");

  var router = require("express").Router();

  router.post("/", tables.create).get("/", tables.findAll).delete("/", tables.deleteAll);
  router.get("/capacity", tables.getCapacities);
  router.get("/:id", tables.findOne).delete("/:id", tables.delete).patch("/:id", tables.update);

  app.use("/api/v1/tables", router);
};