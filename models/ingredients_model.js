const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const Ingredients = sequelize.define("ingredients", {
    ingredient_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    ingredient_name: {
      type: Sequelize.STRING,
      required: true,
    },
  },
    {
      timestamps: false
    });
  return Ingredients;
};
