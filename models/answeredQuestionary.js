const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const answeredQuestionary = sequelize.define("answeredQuestionary", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required:true
  },
  questionID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required:true
  },
  yesOrno: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  developerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = answeredQuestionary;
