module.exports = (app) => {
  const employees = require("../controller/employeesController");
  var router = require("express").Router();

  router.get("/", employees.employees).delete("/", employees.deleteAll);
  router
    .get("/:id", employees.findOne)
    .delete("/:id", employees.delete)
    .patch("/:id", employees.update);
  app.use("/api/v1/employees", router);
};
