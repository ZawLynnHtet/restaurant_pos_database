const db = require("../models/index");
const Table = db.tables;
const ApiFeatuers = require('../middlewares/api_features');
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

exports.create = catchAsync(async (req, res, next) => {
  const tables = {
    table_no: req.body.table_no,
    capacity: req.body.capacity,
    is_available: req.body.is_available
  };


  await Table.create(tables).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  // const features = new ApiFeatuers(Table.findAll(), req.query).sort();
  // const tables = await features.query;

  // res.status(200).json({
  //   status: "success",
  //   tables,
  // });

  await Table.findAll({ order: [['table_id', 'ASC']] }).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.getCapacities = catchAsync(async (req, res, next) => {
  await Table.findAll({ order: [['table_id', 'ASC']], attributes: ['table_id', 'table_no', 'capacity'] }).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Table.findByPk(id).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Table with id=${id}.`,
      });
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Table.destroy({ where: { table_id: id } }).then((deleted) => {
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
  await Table.destroy({ where: {}, truncate: false }).then((deleted) => {
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Deleted all tables",
      });
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Table.update(req.body, {
    where: { table_id: id },
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
