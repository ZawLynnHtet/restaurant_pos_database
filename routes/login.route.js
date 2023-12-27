module.exports = (app) => {
    const employees = require("../controller/employeesController");
    var router = require("express").Router();

    router.post("/", employees.signIn);
    app.use("/api/v1/employees/login", router);
}