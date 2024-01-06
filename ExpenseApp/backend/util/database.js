const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-app', 'root', 'aman', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;