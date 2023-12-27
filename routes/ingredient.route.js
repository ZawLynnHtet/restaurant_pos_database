module.exports = (app) => {
    const ingredient = require("../controller/ingredientController");
    var router = require("express").Router();
    router
        .post("/", ingredient.create)
        .get("/", ingredient.findAll)
        .delete("/", ingredient.deleteAll);
    router
        .get("/:id", ingredient.findOne)
        .delete("/:id", ingredient.delete)
        .patch("/:id", ingredient.update);
    app.use("/api/v1/ingredients", router);
};