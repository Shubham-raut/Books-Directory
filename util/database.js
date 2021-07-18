const Sequelize = require('sequelize');

const sequelize = new Sequelize('books-directory', 'root', 'mysqlpassword', {
  dialect: 'mysql',
  host: 'localhost',
});

module.exports = sequelize;
