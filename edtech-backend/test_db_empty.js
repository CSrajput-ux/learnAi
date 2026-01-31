const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    'root',
    '', // Empty password
    {
        host: 'localhost',
        dialect: 'mysql',
        logging: false
    }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('SUCCESS: Connected with empty password!');
        process.exit(0);
    } catch (error) {
        console.error('FAILED: Empty password did not work.');
        process.exit(1);
    }
})();
