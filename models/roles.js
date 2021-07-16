const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const role = sequelize.define("role", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  roleName: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  }
});

module.exports = role;
