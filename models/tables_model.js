const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Tables = sequelize.define("tables", {
    table_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    table_no: {
      type: Sequelize.INTEGER,
      required: true,
    },
    capacity: {
      type: Sequelize.INTEGER,
      required: true,
    },
    is_available: {
      type: Sequelize.BOOLEAN
    }
  }, {
    timestamps: false
  });
  return Tables;
};
