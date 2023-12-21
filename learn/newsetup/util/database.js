const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'aman', {
  dialect: 'mysql',
  host: 'localhost'
});

module.exports = sequelize;
