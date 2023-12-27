const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const sequelize = new Sequelize(`${process.env.DIALECT}://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DB}?ssl=true`);

// const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
//   host: dbConfig.HOST,
//   dialect: dbConfig.DIALECT,
//   pool: {
//     max: dbConfig.pool.max,
//     min: dbConfig.pool.min,
//     acquire: dbConfig.pool.acquire,
//     idle: dbConfig.pool.idle,
//   },
// });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.menus = require("./menu_model")(sequelize, Sequelize);
db.employees = require("./employees_model")(sequelize, Sequelize);
db.tables = require("./tables_model")(sequelize, Sequelize);
db.customers = require("./customers_model")(sequelize, Sequelize);
db.ingredients = require("./ingredients_model")(sequelize, Sequelize);
db.extraFoods = require("./extrafood_model")(sequelize, Sequelize);
db.orders = require("./order_model")(sequelize, Sequelize);
db.orderDetails = require("./orderdetails_model")(sequelize, Sequelize);
db.bills = require("./bill_model")(sequelize, Sequelize);
db.reservations = require("./reservation_model")(sequelize, Sequelize);
db.categories = require("./category_model")(sequelize, Sequelize);

// db.orders.hasMany(db.tables, { foreignKey: "table_id" });
// db.tables.belongsTo(db.orders, { foreignKey: "table_id" });

// db.orderDetails.hasMany(db.orders, { foreignKey: "order_id" });
// db.orders.belongsTo(db.orderDetails, { foreignKey: "order_id" });

// db.orderDetails.hasMany(db.menus, { foreignKey: "menu_id" });
// db.menus.belongsTo(db.orderDetails, { foreignKey: "menu_id" });

// db.menus.hasMany(db.ingredients, { foreignKey: 'ingredient_ids' });
// db.ingredients.belongsTo(db.menus, { foreignKey: 'ingredient_id' });

// db.menus.hasMany(db.categories, { foreignKey: "category_id" });
// db.categories.belongsTo(db.menus, { foreignKey: "category_id" });

module.exports = db;
