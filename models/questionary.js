const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const questionary = sequelize.define("questionary", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  question: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  adminID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = questionary;
