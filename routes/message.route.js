module.exports = (app) => {
  const message = require("../controller/messageController");
  var router = require("express").Router();
  router.post("/", message.create).get("/", message.findAll);
  router.get("/read", message.findByRead);
  router.get("/printed", message.findByPrinted);
  router.delete("/:id", message.delete).patch("/:id", message.update);
  app.use("/api/v1/message", router);
};
