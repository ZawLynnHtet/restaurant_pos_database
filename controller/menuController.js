const db = require("../models/index");
const Menu = db.menus;
const Category = db.categories;
const catchAsync = require("../middlewares/catchAsync");

exports.create = catchAsync(async (req, res, next) => {
  const menus = {
    category_id: req.body.category_id,
    ingredient_ids: req.body.ingredient_ids,
    extraFood_ids: req.body.extraFood_ids,
    meat_choice: req.body.meat_choice,
    food_name: req.body.food_name,
    quantity: req.body.quantity,
    price: req.body.price,
    img: req.body.img,
    imgData: req.file.buffer,
    is_available: req.body.is_available
  };

  console.log(req.file);
  console.log(req.file.buffer);

  await Menu.create(menus).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findAll = catchAsync(async (req, res, next) => {
  await Menu.findAll().then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.getNames = catchAsync(async (req, res, next) => {
  await Menu.findAll({
    attributes: ['menu_id', 'food_name', 'price']
  }).then((data) => {
    res.status(200).json({
      status: "success",
      data,
    });
  });
});

exports.findByCategoryId = catchAsync(async (req, res, next) => {
  console.log(req.params.ctg_id);
  const category = await Category.findByPk(req.params.ctg_id);
  if (!category)
    return next(
      new AppError(
        `No table found with the provided category id: ${req.params.ctg_id}`,
        404
      )
    );
  var id = req.params.ctg_id * 1;
  const data = await Menu.findAll({
    where: {
      category_id: id,
    },
  });
  res.status(200).json({
    status: "success",
    results: data.length,
    data,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Menu.findByPk(id).then((data) => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find Menu with id=${id}.`,
      });
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Menu.destroy({ where: { menu_id: id } }).then((deleted) => {
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
  await Menu.destroy({ where: {}, truncate: false }).then((deleted) => {
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Deleted all menus",
      });
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Menu.update(req.body, {
    where: { menu_id: id },
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
