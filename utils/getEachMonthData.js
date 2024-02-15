
export function getEachMonthData(data){
    return async (req, res, next) => {
        const {model, matchOptions, dateOptions, populateOptions} = data;
        
        const monthFromParams = req.params.month;
        const year = monthFromParams?.split('-')[0];
        const month = monthFromParams?.split('-')[1];

        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);

        try {
            const result = await model
            .find({
                [dateOptions]: { $gte: startOfMonth, $lt: endOfMonth },
                ...matchOptions
            })
            .populate(populateOptions)
            .sort({[dateOptions]: -1});

            return result;
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
