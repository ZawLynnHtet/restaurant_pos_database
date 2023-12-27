const db = require("../models/index");
const Bills = db.bills;
const Orders = db.orders;
const catchAsync = require("../middlewares/catchAsync");
const AppError = require("../middlewares/appError");

exports.create = catchAsync(async (req, res, next) => {
    const order = await Orders.findOne({ where: { order_id: req.params.id } });

    if (!order) return next(new AppError(`No bill found with the provided order id: ${req.params.id}`, 404));

    const bill = {
        order_id: req.params.id,
        menu_id: req.body.menu_id,
        qty: req.body.qty,
        discount: req.body.discount,
        total_price: req.body.total_price,
        payment_id: req.body.payment_id,
        payment_status: req.body.payment_status
    };

    await Bills.create(bill).then((data) => {
        res.status(200).json({
            status: "success",
            data,
        });
    });

});

exports.getAllBill = catchAsync(async (req, res, next) => {
    const bills = await Bills.findAll();

    res.status(200).json({
        status: 'success',
        bills
    });
});

exports.getAllWithOid = catchAsync(async (req, res, next) => {
    const bills = await Bills.findAll({ where: { order_id: req.params.id } });

    if (!bills) {
        return new AppError("No bill found with the provided order id", 404);
    }

    res.status(200).json({
        status: 'success',
        bills
    });

});

exports.deleteAllWithOrderId = catchAsync(async (req, res, next) => {
    const bills = await Bills.findAll({ where: { order_id: req.params.id } });

    if (!bills) {
        return new AppError("No bill found with the provided order id", 404);
    }

    await Bills.destroy({ where: { order_id: req.params.id } });

    res.status(200).json({
        status: 'success',
        bills: null
    });
});

exports.getOneWithBillId = catchAsync(async (req, res, next) => {
    const bill = await Bills.findOne({ where: { id: req.params.bid } });

    if (!bill) {
        return next(new AppError(`No bill found with the provided bill id: ${req.params.bid}`, 404));
    }

    res.status(200).json({
        status: 'success',
        bill
    });

});

exports.editOneWithBillId = catchAsync(async (req, res, next) => {
    const bill = await Bills.findOne({ where: { id: req.params.bid } });

    if (!bill) {
        return next(new AppError(`No bill found with the provided bill id: ${req.params.bid}`, 404));
    }

    await Bills.update(req.body, { where: { id: req.params.bid } });

    res.status(200).json({
        status: 'success',
        message: "Updated succefully"
    });

});

exports.deleteOneWithBillId = catchAsync(async (req, res, next) => {
    const bill = await Bills.findOne({ where: { id: req.params.bid } });

    if (!bill) {
        return next(new AppError(`No bill found with the provided bill id: ${req.params.bid}`, 404));
    }

    await Bills.destroy({ where: { id: req.params.bid } });

    res.status(200).json({
        status: 'success',
        message: "Deleted succefully"
    });
});

