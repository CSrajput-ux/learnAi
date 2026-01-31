const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Notification = sequelize.define('Notification', {
    message: {
        type: DataTypes.TEXT
    },
    is_read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Notification;
