const bcrypt = require("bcrypt");
const db = require("../models/index");
const Employees = db.employees;
const jwt = require("jsonwebtoken");
const catchAsync = require("../middlewares/catchAsync");

exports.register = catchAsync(async (req, res, next) => {
  const users = {
    email: req.body.email,
    phone: req.body.phone,
    name: req.body.name,
    role: req.body.role,
    img: req.body.img,
    gender: req.body.gender,
    password: await bcrypt.hash(req.body.password, 15),
  };
  // Check if the email exists
  const userExists = await Employees.findOne({
    where: { email: req.body.email },
  });
  if (userExists) {
    return res.status(400).send("Email is already associated with an account");
  }

  Employees.create(users).then((user) => {
    res.status(200).json({
      status: "success",
      message: "Registration was successfully registered",
      user,
    });
  });
});

exports.signIn = catchAsync(async (req, res, next) => {
  const user = await Employees.findOne({
    where: { email: req.body.email },
  });
  if (!user) {
    return res.status(404).json("Email not found");
  }

  // Verify password
  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) {
    return res.status(404).json("Incorrect email and password combination");
  }

  // Authenticate user with jwt
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  res.status(200).json({
    user,
    token,
  });
});

exports.employees = catchAsync(async (req, res, next) => {
  let user;
  if (req.query.role) {
    user = await db.sequelize.query(
      `SELECT employees.employee_id, employees.name, employees.email, employees.role FROM EMPLOYEES WHERE role=${req.query.role}`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      })
  } else {
    user = await db.sequelize.query(
      `SELECT employees.employee_id, employees.name, employees.email, employees.role FROM EMPLOYEES`,
      {
        type: db.Sequelize.QueryTypes.SELECT,
      })
  }

  res.status(200).json({
    status: "success",
    user,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Employees.findByPk(id).then((user) => {
    if (user) {
      res.status(200).json({
        status: "success",
        user
      });
    } else {
      res.status(404).send({
        message: `Cannot find Employee with id=${id}.`,
      });
    }
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Employees.destroy({ where: { employee_id: id } }).then((deleted) => {
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
  await Employees.destroy({ where: {}, truncate: false }).then((deleted) => {
    if (deleted) {
      res.status(200).json({
        status: "success",
        message: "Deleted all Employees",
      });
    }
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const id = req.params.id * 1;

  await Employees.update(req.body, {
    where: { employee_id: id },
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
