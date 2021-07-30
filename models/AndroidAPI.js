const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const androidAPI = sequelize.define("androidAPI", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  codeName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  version: {
    type: Sequelize.FLOAT,
    allowNull: false,
    required: true,
  },
  API_Level: {
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

module.exports = androidAPI;
