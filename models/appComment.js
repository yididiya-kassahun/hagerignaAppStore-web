const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const appComment = sequelize.define("appComment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  userID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = appComment;
