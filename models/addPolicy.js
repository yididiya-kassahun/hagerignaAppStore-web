const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const addPolicy = sequelize.define("addPolicy", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  policyTitle: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
  policyContent: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
});

module.exports = addPolicy;
