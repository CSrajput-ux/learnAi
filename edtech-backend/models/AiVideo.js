const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const AiVideo = sequelize.define('AiVideo', {
  topic: {
    type: DataTypes.STRING,
    allowNull: false
  },
  videoUrl: { // Server par file ka path (/videos/abc.mp4)
    type: DataTypes.STRING,
    allowNull: false
  },
  script: { 
    type: DataTypes.JSON // Topics covered, timestamps, script lines
  },
  duration: {
    type: DataTypes.STRING // e.g., "5 min 23 sec"
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = AiVideo;
