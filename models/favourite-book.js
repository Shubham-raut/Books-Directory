const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const FavouriteBook = sequelize.define('favouriteBook', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = FavouriteBook;
