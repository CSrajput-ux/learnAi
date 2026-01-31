const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    teacher_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    image_url: {
        type: DataTypes.TEXT
    }
});

module.exports = Course;
