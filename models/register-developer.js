const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const developer = sequelize.define("developer", {
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
    unique: true,
  },
  phoneNumber: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
    unique: true,
  },
  companyName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  developerType: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  role: {
    type: Sequelize.INTEGER,
    allowNull: false,
    required: true,
  },
  password: {
    type: Sequelize.STRING,
    required: true,
  },
});

module.exports = developer;
