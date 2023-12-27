const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Menus = sequelize.define("menus", {
    menu_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    category_id: {
      type: Sequelize.INTEGER,
      foreignKey: true,
    },
    ingredient_ids: {
      type: Sequelize.JSON,
      foreignKey: true,
    },
    extraFood_ids: {
      type: Sequelize.JSON,
      foreignKey: true,
    },
    meat_choice: {
      type: Sequelize.JSON({ values: ['Chicken', 'Pork', 'Beef', 'Fried Egg'] }),
      defaultValue: null,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    food_name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    price: {
      type: Sequelize.INTEGER,
    },
    img: {
      type: Sequelize.STRING,
    },
    is_available: {
      type: Sequelize.BOOLEAN
    }
  }, {
    timestamps: false
  });

  return Menus;
};
