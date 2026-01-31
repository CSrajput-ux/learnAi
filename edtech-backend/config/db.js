const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite', // File-based DB
  logging: false
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ SQL Database Connected Successfully.');
    await sequelize.sync();
    console.log('✅ All Tables Synced.');
  } catch (error) {
    console.error('❌ SQL Connection Failed:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };