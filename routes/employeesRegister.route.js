module.exports = (app) => {
    const employees = require("../controller/employeesController");
    var router = require("express").Router();

    router.post("/", employees.register);
    app.use("/api/v1/employees/register", router);
}