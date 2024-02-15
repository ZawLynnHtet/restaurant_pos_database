import ErrorHandler from "./ErrorHandler.js";

export function getMonthlyData(data) {
  return async (req, res, next) => {
    const { model, matchOptions, dateOptions, sumOptions } = data;
    const year = parseInt(req.params.year);

    if (isNaN(year)) {
      return next(new ErrorHandler("Invalid year", 400));
    }

    const startOfYear = new Date(year, 0, 1);
    const endOfYear = new Date(year + 1, 0, 1);

    try {
      const monthlyData = await model.aggregate([
        {
          $match: {
            ...matchOptions,
            [dateOptions]: { $gte: startOfYear, $lt: endOfYear },
          },
        },
        {
          $group: {
            _id: { $month: `$${dateOptions}` },
            total: { $sum: sumOptions },
          },
        },
        {
          $sort: { _id: 1 },
        },
      ]);

      const result = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const monthData = monthlyData.find((item) => item._id === month);
        return {
          month,
          total: monthData ? monthData.total : 0,
        };
      });

      return result;
    } catch (e) {
      res.status(500).json({ message: e.message });
    }
  };
}
