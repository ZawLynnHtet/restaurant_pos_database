
export function paginatedResults(
    model, 
    findOptions = null,
    populateOptions = null, 
    sortOptions = { createdAt: -1 }
){
    return async (req, res, next) => {
        const page = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 5);
        const startIndex = (page - 1) * limit;

        const results = {};
        const totalItems = await model.countDocuments().exec();
        const totalPages = Math.ceil(totalItems / limit);

        results.totalPages = totalPages;
        try {
            results.results = await model
                .find(findOptions)
                .limit(limit)
                .skip(startIndex)
                .populate(populateOptions)
                .sort(sortOptions)
                .exec();
            return results; 
        } catch (e) {
            res.status(500).json({ message: e.message });
        }
    };
}
