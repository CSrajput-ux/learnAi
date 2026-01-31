const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserProgress = sequelize.define('UserProgress', {
    completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lesson_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = UserProgress;
