const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Module = sequelize.define('Module', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    module_order: {
        type: DataTypes.INTEGER
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Module;
