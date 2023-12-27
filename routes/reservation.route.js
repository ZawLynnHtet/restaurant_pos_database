module.exports = (app) => {
    const reservations = require('../controller/reservationController');
    const router = require('express').Router();

    router.route('/').post(reservations.create).get(reservations.getAll).delete(reservations.deleteAll);
    router.route('/:id').get(reservations.getOne).patch(reservations.edit).delete(reservations.delete);

    app.use('/api/v1/reservations', router);
};