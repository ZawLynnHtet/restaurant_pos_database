const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const ExtraFoods = sequelize.define("extraFoods", {
    extraFood_id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    food_name: {
      type: Sequelize.STRING,
      required: true,
    },
    price: {
      type: Sequelize.INTEGER,
    }
  },
    {
      timestamps: false
    });
  return ExtraFoods;
};
