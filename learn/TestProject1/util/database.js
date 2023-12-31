const Sequelize = require('sequelize');

const sequelize = new Sequelize('database-test', 'root', 'aman', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;