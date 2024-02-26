const db = require("../models/index");
const Message = db.messages;
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

exports.create = catchAsync(async (req, res, next) => {
  const message = {
    message_id: req.body.message_id,
    table_id: req.body.table_id,
    order_id: req.body.order_id,
    waiter_id: req.body.waiter_id,
    kitchen: req.body.kitchen,
    read: req.body.read,
  };

  await Message.create(message).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  await Message.findAll().then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findByPrinted = catchAsync(async (req, res, next) => {
  const data = await Message.findAll({
    where: {
      print: req.query.print,
    },
  });
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.findByRead = catchAsync(async (req, res, next) => {
  const data = await Message.findAll({
    where: {
      read: req.query.read,
    },
  });
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Message.destroy({ where: { message_id: id } }).then((deleted) => {
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Message.update(req.body, {
    where: { message_id: id },
  }).then((updated) => {
    if (updated) {
      res.status(200).json({
        status: "success",
        message: "Updated successfully",
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
  });
});
