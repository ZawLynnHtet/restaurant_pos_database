const { Sequelize, sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Employees = sequelize.define("employees", {
    employee_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      required: true,
    },
    phone: {
      type: Sequelize.STRING,
      required: true,
    },
    img: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.STRING,
    },
    role: {
      type: Sequelize.STRING,
      required: true,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      required: [true, "Please confirm your password"],
      allowNull: false,
    },
  }, {
    timestamps: false
  });
  return Employees;
};
