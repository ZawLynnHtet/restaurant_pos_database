const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Messages = sequelize.define("messages", {
    message_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    table_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    order_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    waiter_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    kitchen: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    print: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  return Messages;
};
