const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  summary: {
    type: DataTypes.TEXT
  },
  keyPoints: {
    type: DataTypes.JSON,
    defaultValue: []
  },
  examTips: {
    type: DataTypes.JSON,
    defaultValue: []
  }
});

module.exports = Note;