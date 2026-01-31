const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AiNote = sequelize.define('AiNote', {
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  subject: { // E.g., Biology, Physics
    type: DataTypes.STRING
  },
  content: { 
    type: DataTypes.JSON, 
    // Isme pura structure aayega: { intro: "...", keyPoints: [], summary: "..." }
    allowNull: false
  },
  language: { // English/Hindi
    type: DataTypes.STRING,
    defaultValue: 'English'
  },
  level: { // Beginner/Exam-Focused
    type: DataTypes.STRING,
    defaultValue: 'Beginner'
  },
  userId: { // Kisne generate kiya
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = AiNote;
