const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const user = sequelize.define("user", {
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
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  jobType: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  age: {
    type: Sequelize.INTEGER,
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
  isDeactivated: {
    type: Sequelize.BOOLEAN,
    allowNull:false,
    required: true,
    defaultValue:false
  }
});

module.exports = user;
