const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const apkFileDetail = sequelize.define("apkFileDetail", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  apkFile: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  packageName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  appVersion: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  API_Req: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  apkSize: {
    type: Sequelize.FLOAT,
    allowNull: false,
    required: true,
  },
  appID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  developerID: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
});

module.exports = apkFileDetail;
