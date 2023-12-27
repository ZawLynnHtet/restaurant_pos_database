const db = require("../models/index");
const OrderDetails = db.orderDetails;
const Orders = db.orders;
const Menus = db.menus;
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");
const { or } = require("sequelize");

exports.create = catchAsync(async (req, res, next) => {
  const orderDetails = {
    order_id: req.body.order_id,
    menu_id: req.body.menu_id,
    quantity: req.body.quantity,
    choice_of_meat: req.body.choice_of_meat,
    removed_ingredients: req.body.removed_ingredients,
    extra_ingredients: req.body.extra_ingredients,
    extra_quantity: req.body.extra_quantity,
    takeaway: req.body.takeaway,
  };

  await OrderDetails.create(orderDetails).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  await OrderDetails.findAll().then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findByOrderId = catchAsync(async (req, res, next) => {
  const order = await Orders.findByPk(req.params.oid);

  if (!order)
    return next(
      new AppError(
        `No order found with the provided order id: ${req.params.oid}`,
        404
      )
    );

  const data = await OrderDetails.findAll({
    where: { order_id: req.params.oid },
    // include: [
    //   {
    //     model: Menus,
    //     attributes: ['food_name', 'price']
    //   },
    // ],
  });

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await OrderDetails.findByPk(id).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find OrderDetail with id=${id}.`,
      });
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await OrderDetails.destroy({ where: { orderDetails_id: id } }).then(
    (deleted) => {
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
    }
  );
});

exports.deleteAll = catchAsync(async (req, res, next) => {
  await OrderDetails.destroy({ where: {}, truncate: false }).then((deleted) => {
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Deleted all orders",
      });
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await OrderDetails.update(req.body, {
    where: { orderDetails_id: id },
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
