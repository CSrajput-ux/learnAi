const { sequelize } = require('../config/db');

// Import all models
const User = require('./User');
const AiVideo = require('./AiVideo');
const AiNote = require('./AiNote');
const Quiz = require('./Quiz');
const Video = require('./Video');
const CommunityPost = require('./CommunityPost');
const CommunityNote = require('./CommunityNote');
const Note = require('./Note');

// New Models
const Course = require('./Course');
const Module = require('./Module');
const Lesson = require('./Lesson');
const UserProgress = require('./UserProgress');
const AIRequest = require('./AIRequest');
const Comment = require('./Comment');
const Notification = require('./Notification');

// Define Associations

// 1. User Associations
User.hasMany(Course, { foreignKey: 'teacher_id' });
Course.belongsTo(User, { foreignKey: 'teacher_id' });

User.hasMany(UserProgress, { foreignKey: 'user_id' });
UserProgress.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AIRequest, { foreignKey: 'user_id' });
AIRequest.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Notification, { foreignKey: 'user_id' });
Notification.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(AiVideo, { foreignKey: 'userId' });
AiVideo.belongsTo(User, { foreignKey: 'userId' });

// 2. Course & Module Structure
Course.hasMany(Module, { foreignKey: 'course_id', onDelete: 'CASCADE' });
Module.belongsTo(Course, { foreignKey: 'course_id' });

Module.hasMany(Lesson, { foreignKey: 'module_id', onDelete: 'CASCADE' });
Lesson.belongsTo(Module, { foreignKey: 'module_id' });

// 3. Lesson Interactions
Lesson.hasMany(UserProgress, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });
UserProgress.belongsTo(Lesson, { foreignKey: 'lesson_id' });

Lesson.hasMany(Comment, { foreignKey: 'lesson_id', onDelete: 'CASCADE' });
Comment.belongsTo(Lesson, { foreignKey: 'lesson_id' });


module.exports = {
  sequelize,
  User,
  AiVideo,
  AiNote,
  Quiz,
  Video,
  CommunityPost,
  CommunityNote,
  Note,
  Course,
  Module,
  Lesson,
  UserProgress,
  AIRequest,
  Comment,
  Notification
};
