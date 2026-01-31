const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Comment = sequelize.define('Comment', {
    comment_text: {
        type: DataTypes.TEXT
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

module.exports = Comment;
