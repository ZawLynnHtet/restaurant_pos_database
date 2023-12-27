const db = require('../models/index');
const Reservaions = db.reservations;
const catchAsync = require('../middlewares/catchAsync');
const AppError = require('../middlewares/appError');

exports.create = catchAsync(async (req, res, next) => {
    const data = {
        supervisor_id: req.body.supervisor_id,
        table_id: req.body.table_id,
        reserved_date: req.body.reserved_date,
        reserved_time: req.body.reserved_time,
        reserved_by: req.body.reserved_by,
        num_of_people: req.body.num_of_people,
        phone: req.body.phone,
        prepared: req.body.prepared,
        notes: req.body.notes,
        deposit: req.body.deposit
    };

    await Reservaions.create(data).then((reservation) => {
        res.status(200).json({
            status: 'success',
            reservation
        });
    });
});

exports.getAll = catchAsync(async (req, res, next) => {
    const reservations = await Reservaions.findAll();

    res.status(200).json({
        status: 'success',
        reservations
    });
});

exports.deleteAll = catchAsync(async (req, res, next) => {
    await Reservaions.destroy({ where: {}, truncate: false });

    res.status(200).json({
        status: 'success',
        message: 'Deleted all reservations'
    })
});

exports.getOne = catchAsync(async (req, res, next) => {
    const reservation = await Reservaions.findByPk(req.params.id);

    if (!reservation) return next(new AppError(`No reservation found with the provided id: ${req.params.id}`, 404));

    res.status(200).json({
        status: 'success',
        reservation
    })
});

exports.edit = catchAsync(async (req, res, next) => {
    const reservation = await Reservaions.findByPk(req.params.id);

    if (!reservation) return next(new AppError(`No reservation found with the provided id: ${req.params.id}`, 404));

    await Reservaions.update(req.body, { where: { id: req.params.id } }).then((updated) => {
        res.status(200).json({
            status: 'success',
            message: 'Updated succefully'
        });
    });
});

exports.delete = catchAsync(async (req, res, next) => {
    const reservation = await Reservaions.findByPk(req.params.id);

    if (!reservation) return next(new AppError(`No reservation found with the provided id: ${req.params.id}`, 404));

    await Reservaions.destroy({ where: { id: req.params.id } });

    res.status(200).json({
        status: 'success',
        message: "Deleted succefully"
    });
});