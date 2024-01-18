const Sequelize = require('sequelize');

const sequelize = new Sequelize('chat-app', 'root', 'aman', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;