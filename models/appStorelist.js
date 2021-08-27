const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const storeList = sequelize.define("appstorelist", {
  id: {
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
  shortDescription: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  longDescription: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appIconURL: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  featureGraphicsURL: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  videoURL: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  phoneScreeenshootURL1: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  phoneScreeenshootURL2: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  phoneScreeenshootURL3: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  isPublished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false,
  },
  developerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = storeList;
