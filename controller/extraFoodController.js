const { Sequelize, Op } = require("sequelize");
const db = require("../models/index");
const ExtraFood = db.extraFoods;
const ApiFeatuers = require("../middlewares/api_features");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");
exports.create = catchAsync(async (req, res, next) => {
    const extraFood = {
        food_name: req.body.food_name,
        price: req.body.price,
    };
    await ExtraFood.create(extraFood).then((data) => {
        res.status(200).json({
            status: "success",
            data,
        });
    });
});
exports.findAll = catchAsync(async (req, res, next) => {
    await ExtraFood.findAll().then((data) => {
        res.status(200).json({
            status: "success",
            data,
        });
    });
});
exports.findOne = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;
    await ExtraFood.findByPk(id).then((data) => {
        if (data) {
            res.send(data);
        } else {
            res.status(404).send({
                message: `Cannot find ExtraFood with id=${id}.`,
            });
        }
    });
});
exports.delete = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;
    await ExtraFood.destroy({ where: { extraFood_id: id } }).then((deleted) => {
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
    await ExtraFood.destroy({ where: {}, truncate: false }).then((deleted) => {
        if (deleted) {
            res.status(200).json({
                status: "success",
                message: "Deleted all extraFood",
            });
        }
    });
});
exports.update = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;
    await ExtraFood.update(req.body, {
        where: { extraFood_id: id },
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