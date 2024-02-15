import ErrorHandler from "./ErrorHandler.js";

export function getDateRangeData(data){
    return async (req, res, next) => {
        const {model, matchOptions, dateOptions, populateOptions} = data;
        
        const { startDate, endDate } = req.params;
        if (!startDate || !endDate || new Date(startDate) > new Date(endDate)) {
            return next(new ErrorHandler("Invalid date range", 400));
        }
        const startOfRange = new Date(startDate);
        const endOfRange = new Date(endDate);

        try {
            const result = await model
                .find({
                    [dateOptions]: { $gte: startOfRange, $lt: endOfRange },
                    ...matchOptions
                })
                .populate(populateOptions)
                .sort({ [dateOptions]: -1 });

            return result;
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
