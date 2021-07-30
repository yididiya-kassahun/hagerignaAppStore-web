const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const collectedEmail = sequelize.define("collectedEmail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    defaultValue: "not sent",
  },
  adminID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = collectedEmail;
