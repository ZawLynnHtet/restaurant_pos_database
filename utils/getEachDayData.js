const { Op } = require("sequelize");
const catchAsync = require("../middlewares/catchAsync");
const db = require("../models/index");
const ExtraFood = db.extraFoods;

exports.getEachDayData = catchAsync(async (req, res) => {
  await ExtraFood.findAll({
    where: {
      food_name: { [Op.like]: "%" + req.query.food_name + "%" },
    },
  })
    .then((result) => {
      res.status(200).json({
        result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: err,
        result: err,
      });
    });
});

// export function getEachDayData(data) {
//   return async (req, res, next) => {
//     const { model, matchOptions, dateOptions, populateOptions } = data;

//     const { day } = req.params;

//     const startOfDay = new Date(day);
//     const endOfDay = new Date(day);
//     endOfDay.setDate(endOfDay.getDate() + 1);

//     try {
//       const result = await model
//         .find({
//           [dateOptions]: { $gte: startOfDay, $lt: endOfDay },
//           ...matchOptions,
//         })
//         .populate(populateOptions)
//         .sort({ [dateOptions]: -1 });

//       return result;
//     } catch (e) {
//       res.status(500).json({ message: e.message });
//     }
//   };
// }

// db.Event.findAll({
//   where: {
//      [db.Sequelize.Op.and]: [{ isPrivate: false },
//          { startdate: { $gte: new Date().toLocaleDateString() } },
//          { starttime: { $gt: new Date().toLocaleTimeString('en-GB') } }
//      ]
//   },
//   include: [{
//     model: db.Center,
//     attributes: ['id', 'name', 'location']
//   }],
//   order: [
//     ['startdate', 'ASC'],
//     ['starttime', 'ASC']
//   ]
// })
//  .then((events) => {
//   res.status(200).json({
//       success: 'ok',
//       data: events
//  });
// })
// .catch((err) => {
//  res.status(500).json({
//    message: err.message || 'Internal server error',
//  });
// });

// const dateOfToday = new Date();
// const timeOfToday = moment().format('HH:mm:ss');

// const daysEqualToToday = db.Event.findAll({
//   where: {
//     startdate: { $eq: dateOfToday },
//   },
//   include: [{
//     model: db.Center,
//     attributes: ['id', 'name', 'location']
//   }],
//   order: [
//     ['startdate', 'ASC'],
//     ['starttime', 'ASC']
//   ]
// })
//   .then(events =>
//     events.filter(event => event.starttime > timeOfToday));

// const daysGreaterThanToday = db.Event.findAll({
//   where: {
//     startdate: { $gt: dateOfToday },
//   },
//   include: [{
//     model: db.Center,
//     attributes: ['id', 'name', 'location']
//   }],
//   order: [
//     ['startdate', 'ASC'],
//     ['starttime', 'ASC']
//   ]
// });

// Promise
//   .all([daysEqualToToday, daysGreaterThanToday])
//   .then((results) => {
//     const combinedResult = [].concat(...results);
//     res.status(200).json({
//       success: 'ok',
//       data: combinedResult
//     });
//   })
//   .catch((err) => {
//     res.status(500).json({
//       message: err.message || 'Internal server error',
//     });
//   });
