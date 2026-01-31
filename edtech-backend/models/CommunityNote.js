const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommunityNote = sequelize.define('CommunityNote', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  subject: { type: DataTypes.STRING },
  classLevel: { type: DataTypes.STRING },
  authorName: { type: DataTypes.STRING, defaultValue: "Anonymous Student" },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 }
});

module.exports = CommunityNote;
