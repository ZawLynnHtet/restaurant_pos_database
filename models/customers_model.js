const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Customers = sequelize.define("customers", {
    customer_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      required: true,
    },
    phone: {
      type: Sequelize.INTEGER,
      required: true,
    },
  });
  return Customers;
};
