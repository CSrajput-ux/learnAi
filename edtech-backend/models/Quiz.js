const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Quiz = sequelize.define('Quiz', {
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  questions: { 
    type: DataTypes.JSON, 
    // Array of Objects: [{ question: "...", options: [], answer: "..." }]
    allowNull: false
  },
  score: { 
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Quiz;