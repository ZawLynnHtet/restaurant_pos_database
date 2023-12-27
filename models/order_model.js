const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    order_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    table_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    waitstaff_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    order_type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total_price: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    discount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    is_paid: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    order_submitted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    is_finished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    orderDate: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
  }, {
    timestamps: false
  });

  return Orders;
};
