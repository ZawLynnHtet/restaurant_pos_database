const db = require("../models/index");
const Ingredient = db.ingredients;
const ApiFeatuers = require("../middlewares/api_features");
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

exports.create = catchAsync(async (req, res, next) => {
    const ingredient = {
        ingredient_name: req.body.ingredient_name,
    };
    await Ingredient.create(ingredient).then((data) => {
        res.status(200).json({
            status: "success",
            data,
        });
    });
});
exports.findAll = catchAsync(async (req, res, next) => {
    await Ingredient.findAll().then((data) => {
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
                message: `Cannot find Ingredient with id=${id}.`,
            });
        }
    });
});
exports.delete = catchAsync(async (req, res, next) => {
    const id = req.params.id * 1;
    await Ingredient.destroy({ where: { ingredient_id: id } }).then((deleted) => {
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
    await Ingredient.destroy({ where: {}, truncate: false }).then((deleted) => {
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
    await Ingredient.update(req.body, {
        where: { ingredient_id: id },
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