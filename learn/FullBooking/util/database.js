const Sequelize = require('sequelize');

const sequelize = new Sequelize('full-booking', 'root', 'aman', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;