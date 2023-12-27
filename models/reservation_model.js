const moment = require('moment');

module.exports = (sequelize, Sequelize) => {
    const Reservaions = sequelize.define('reservations', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        supervisor_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        table_id: {
            type: Sequelize.INTEGER,
            foreignKey: true
        },
        reserved_date: {
            type: Sequelize.DATEONLY,
            allowNull: false
        },
        reserved_time: {
            type: Sequelize.TIME,
            allowNull: false
        },
        reserved_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Date.now(),
        },
        reserved_by: {
            type: Sequelize.STRING,
            allowNull: false
        },
        num_of_people: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        prepared: {
            type: Sequelize.STRING,
            allowNull: true
        },
        notes: {
            type: Sequelize.STRING
        },
        deposit: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    });

    return Reservaions;
}