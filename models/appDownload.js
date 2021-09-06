const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const appDownload = sequelize.define("appDownload", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  appDownloaded: {
    type: Sequelize.BOOLEAN,
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

module.exports = appDownload;
