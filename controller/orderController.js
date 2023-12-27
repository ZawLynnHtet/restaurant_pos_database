const QueryTypes = require('sequelize');
const db = require("../models/index");
const Orders = db.orders;
const Tables = db.tables;
const OrderDetails = db.orderDetails;
const Menus = db.menus;
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

exports.create = catchAsync(async (req, res, next) => {
  const orders = {
    table_id: req.body.table_id,
    waitstaff_id: req.body.waitstaff_id,
    order_type: req.body.order_type,
    order_submitted: req.body.order_submitted,
    total_price: req.body.total_price,
    discount: req.body.discount,
    is_paid: req.body.is_paid,
    is_finished: req.body.is_finished,
  };

  await Orders.create(orders).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  await Orders.findAll().then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.getAllByTableId = catchAsync(async (req, res, next) => {
  const table = await Tables.findByPk(req.params.tid);

  if (!table)
    return next(
      new AppError(
        `No table found with the provided table id: ${req.params.tid}`,
        404
      )
    );

  if (!req.query.submitted) {
    req.query.submitted = false;
  }

  const data = await db.sequelize.query(
    `SELECT * FROM Orders JOIN "orderDetails" ON Orders.order_id="orderDetails".order_id AND Orders.table_id=${req.params.tid} AND Orders.order_submitted=${req.query.submitted} AND Orders.is_finished=false`,
    {
      // type: db.Sequelize.QueryTypes.SELECT,
      model: OrderDetails,
      mapToModel: true,
      // order: ['menu_id']
    }
  );

  // const data = await Orders.findAll({
  //   where: { table_id: req.params.tid },
  //   include: [
  //     {
  //       model: OrderDetails,
  //       required: true
  //       // include: [
  //       //   {
  //       //     model: Menus,
  //       //     attributes: ["menu_id", "food_name", "price"],
  //       //   },
  //       // ],
  //     },
  //   ],
  // });

  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Orders.findByPk(id).then((data) => {
    if (data) {
      res.status(200).json({
        status: "success",
        data
      });
    } else {
      res.status(404).send({
        message: `Cannot find Order with id=${id}.`,
      });
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Orders.destroy({ where: { order_id: id } }).then((deleted) => {
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

exports.deleteAll = catchAsync(async (req, res, next) => {
  await Orders.destroy({ where: {}, truncate: false }).then((deleted) => {
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

  await Orders.update(req.body, {
    where: { order_id: id },
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
