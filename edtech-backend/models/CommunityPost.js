const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CommunityPost = sequelize.define('CommunityPost', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  subject: {
    type: DataTypes.STRING
  },
  classLevel: {
    type: DataTypes.STRING
  },
  fileUrl: { // PDF link jo upload kiya gaya
    type: DataTypes.STRING
  },
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  authorName: { // User ka naam display karne ke liye
    type: DataTypes.STRING
  },
  userId: { // Link to User model
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = CommunityPost;
