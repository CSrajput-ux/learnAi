const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AIRequest = sequelize.define('AIRequest', {
    topic: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('video', 'notes', 'quiz'),
        allowNull: false
    },
    prompt: {
        type: DataTypes.TEXT
    },
    output_url: {
        type: DataTypes.TEXT
    },
    status: {
        type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed'),
        defaultValue: 'pending'
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = AIRequest;
