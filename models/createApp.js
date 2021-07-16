const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const createApp = sequelize.define("createApp", {
  appID: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appIcon: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  defaultLanguage: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  isApporGame: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  isPaidorFree: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appStatus: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    defaultValue: "Draft",
  },
  downloads: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
    defaultValue: 0,
  },
  developerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = createApp;
