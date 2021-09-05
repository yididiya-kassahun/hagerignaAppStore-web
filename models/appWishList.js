const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const appWishList = sequelize.define("appWishList", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  userID: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = appWishList;
