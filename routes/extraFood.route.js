module.exports = (app) => {
    const extraFood = require("../controller/extraFoodController");
    var router = require("express").Router();
    router
        .post("/", extraFood.create)
        .get("/", extraFood.findAll)
        .delete("/", extraFood.deleteAll);
    router
        .get("/:id", extraFood.findOne)
        .delete("/:id", extraFood.delete)
        .patch("/:id", extraFood.update);
    app.use("/api/v1/extra-food", router);
};