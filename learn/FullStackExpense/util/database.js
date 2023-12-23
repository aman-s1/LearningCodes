const Sequelize = require('sequelize');

const sequelize = new Sequelize('full-expense', 'root', 'aman', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;