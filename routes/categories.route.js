module.exports = (app) => {
  const categories = require("../controller/categoriesController");

  var router = require("express").Router();

  router
    .post("/", categories.create)
    .get("/", categories.findAll)
    .delete("/", categories.deleteAll);
  router
    .get("/:id", categories.findOne)
    .delete("/:id", categories.delete)
    .patch("/:id", categories.update);

  app.use("/api/v1/categories", router);
};
