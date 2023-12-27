const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const OrderDetails = sequelize.define("orderDetails", {
    orderDetails_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    menu_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    choice_of_meat: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    removed_ingredients: {
      type: Sequelize.JSON,
    },
    extra_ingredients: {
      type: Sequelize.JSON,
    },
    extra_quantity: {
      type: Sequelize.JSON,
    },
    takeaway: {
      type: Sequelize.BOOLEAN
    },
    note: {
      type: Sequelize.STRING
    }
  }, {
    timestamps: false
  });

  return OrderDetails;
};
