const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const reviewApp = sequelize.define("reviewApp", {
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
  approved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false,
  },
  disapproved: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false,
  },
  summery: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  editorChoice: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    required: true,
    defaultValue: false,
  },
  reviewerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = reviewApp;
