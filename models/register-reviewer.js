const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const reviewer = sequelize.define("reviewer", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  Email: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = reviewer;
