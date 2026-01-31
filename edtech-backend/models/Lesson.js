const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Lesson = sequelize.define('Lesson', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content_type: {
        type: DataTypes.ENUM('video', 'text', 'ai-generated'),
        allowNull: false
    },
    video_url: {
        type: DataTypes.TEXT
    },
    content: {
        type: DataTypes.TEXT
    },
    ai_prompt: {
        type: DataTypes.TEXT
    },
    module_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Lesson;
