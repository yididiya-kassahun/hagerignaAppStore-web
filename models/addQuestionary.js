const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const addQuestionary = sequelize.define("addQuestionary", {
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

module.exports = addQuestionary;
