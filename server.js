const express = require("express");
const cors = require("cors");
const db = require("./models/index");
const AppError = require("./middlewares/appError");
const globalErrorHandler = require("./controller/errorController");
var socket = require("socket.io");
var connection = require("./connection");
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
var server = app.listen(8080, () => {
  console.log("-------- Server is listening on port 8080 --------");
});

const documents = {};

var socketIo = socket(server);
socketIo.on("connection", (socket) => {
  let previousId;

  const safeJoin = (currentId) => {
    socket.leave(previousId);
    socket.join(currentId, () =>
      console.log(`Socket ${socket.id} joined room ${currentId}`)
    );
    previousId = currentId;
  };

  socket.on("getDoc", (docId) => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", (doc) => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    socketIo.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", (doc) => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  socketIo.emit("documents", Object.keys(documents));

  console.log(`Socket ${socket.id} has connected`);
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
