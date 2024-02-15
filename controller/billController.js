const db = require("../models/index");
const Bills = db.bills;
const Orders = db.orders;
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");
const { Op, Sequelize, DATE } = require("sequelize");
const moment = require("moment");

exports.create = catchAsync(async (req, res, next) => {
  const order = await Orders.findOne({ where: { order_id: req.params.id } });

  if (!order)
    return next(
      new AppError(
        `No bill found with the provided order id: ${req.params.id}`,
        404
      )
    );

  const bill = {
    order_id: req.params.id,
    menu_id: req.body.menu_id,
    qty: req.body.qty,
    discount: req.body.discount,
    total_price: req.body.total_price,
    payment_id: req.body.payment_id,
    payment_status: req.body.payment_status,
  };

  await Bills.create(bill).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.getAllBill = catchAsync(async (req, res, next) => {
  const bills = await Bills.findAll();

  res.status(200).json({
    status: "success",
    bills,
  });
});

exports.getIncomeByMonthly = catchAsync(async (req, res, next) => {
  const currentYear = new Date().getFullYear();

  const data = await Bills.findAll({
    attributes: [
      [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")'), "month"], // Extracting month from the createdAt column
      [Sequelize.fn("SUM", Sequelize.col("total_price")), "totalPrice"], // Summing up the 'price' column
    ],
    where: {
      createdAt: {
        [Op.between]: [
          new Date(currentYear, 0, 1),
          new Date(currentYear, 11, 31),
        ],
      },
    },
    group: [Sequelize.literal('EXTRACT(MONTH FROM "createdAt")')],
    raw: true,
  });
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.getIncomeByEachMonth = catchAsync(async (req, res, next) => {
  const data = await Bills.findOne({
    attributes: [
      [Sequelize.fn("SUM", Sequelize.col("total_price")), "totalPrice"],
    ],
    where: {
      createdAt: {
        [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.getIncomeByDaily = catchAsync(async (req, res, next) => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const data = await Bills.findAll({
    attributes: [
      [Sequelize.literal(`DATE("createdAt")`), "date"],
      [Sequelize.fn("SUM", Sequelize.col("total_price")), "totalPrice"],
    ],
    where: {
      createdAt: {
        [Op.between]: [firstDayOfMonth, lastDayOfMonth],
      },
    },
    group: [Sequelize.literal(`DATE("createdAt")`)],
  });
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.getIncomeByEachDay = catchAsync(async (req, res, next) => {
  const params = req.query.createdAt;

  const searchDate = new Date(params);
  const startOfDay = new Date(
    searchDate.getFullYear(),
    searchDate.getMonth(),
    searchDate.getDate()
  );
  const endOfDay = new Date(
    searchDate.getFullYear(),
    searchDate.getMonth(),
    searchDate.getDate() + 1
  );

  const data = await Bills.findOne({
    attributes: [
      [Sequelize.literal(`DATE("createdAt")`), "date"],
      [Sequelize.fn("SUM", Sequelize.col("total_price")), "totalPrice"],
    ],
    where: {
      createdAt: {
        [Op.between]: [startOfDay, endOfDay],
      },
    },
    group: [Sequelize.literal(`DATE("createdAt")`)],
  });
  res.status(200).json({
    status: "success",
    data,
  });
});

exports.getAllWithOid = catchAsync(async (req, res, next) => {
  const bills = await Bills.findAll({ where: { order_id: req.params.id } });

  if (!bills) {
    return new AppError("No bill found with the provided order id", 404);
  }

  res.status(200).json({
    status: "success",
    bills,
  });
});

exports.deleteAllWithOrderId = catchAsync(async (req, res, next) => {
  const bills = await Bills.findAll({ where: { order_id: req.params.id } });

  if (!bills) {
    return new AppError("No bill found with the provided order id", 404);
  }

  await Bills.destroy({ where: { order_id: req.params.id } });

  res.status(200).json({
    status: "success",
    bills: null,
  });
});

exports.getOneWithBillId = catchAsync(async (req, res, next) => {
  const bill = await Bills.findOne({ where: { id: req.params.bid } });

  if (!bill) {
    return next(
      new AppError(
        `No bill found with the provided bill id: ${req.params.bid}`,
        404
      )
    );
  }

  res.status(200).json({
    status: "success",
    bill,
  });
});

exports.editOneWithBillId = catchAsync(async (req, res, next) => {
  const bill = await Bills.findOne({ where: { id: req.params.bid } });

  if (!bill) {
    return next(
      new AppError(
        `No bill found with the provided bill id: ${req.params.bid}`,
        404
      )
    );
  }

  await Bills.update(req.body, { where: { id: req.params.bid } });

  res.status(200).json({
    status: "success",
    message: "Updated succefully",
  });
});

exports.deleteOneWithBillId = catchAsync(async (req, res, next) => {
  const bill = await Bills.findOne({ where: { id: req.params.bid } });

  if (!bill) {
    return next(
      new AppError(
        `No bill found with the provided bill id: ${req.params.bid}`,
        404
      )
    );
  }

  await Bills.destroy({ where: { id: req.params.bid } });

  res.status(200).json({
    status: "success",
    message: "Deleted succefully",
  });
});
