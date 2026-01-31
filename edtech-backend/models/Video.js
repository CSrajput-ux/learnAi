const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Video = sequelize.define('Video', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  slides: {
    type: DataTypes.JSON,
    allowNull: false
  }
});

module.exports = Video;