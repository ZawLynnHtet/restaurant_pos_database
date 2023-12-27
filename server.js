const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const AppError = require("./middlewares/appError");
const globalErrorHandler = require("./controller/errorController");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
// console.log(process.env);

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());

db.sequelize
  .sync({ alter: true })
  .then(() => {
    console.log(" -------- DB Connected --------");
    console.log(" -------- Drop and resync db --------");
  })
  .catch((e) => {
    console.log("Failed to connect" + e);
  });

require("./routes/menus.route")(app);
require("./routes/tables.route")(app);
require("./routes/employeesRegister.route")(app);
require("./routes/login.route")(app);
require("./routes/employees.route")(app);
require("./routes/order.route")(app);
require("./routes/orderdetails.route")(app);
require("./routes/bill.route")(app);
require("./routes/reservation.route")(app);
require("./routes/categories.route")(app);
require("./routes/extraFood.route")(app);
require("./routes/ingredient.route")(app);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalErrorHandler);
app.listen(8080, () => {
  console.log("-------- Server is listening on port 8080 --------");
});

// module.exports = (err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "error";

//   if (process.env.NODE_ENVIRONMENT === "development") {
//     res.status(err.statusCode).json({
//       status: err.status,
//       err: err,
//       message: err.message,
//       errorStack: err.stack,
//     });
//   } else if (process.env.NODE_ENVIRONMENT === "production") {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   }
// };
