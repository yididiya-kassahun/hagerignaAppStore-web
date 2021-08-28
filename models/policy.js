const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const policy = sequelize.define("policy", {
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
  // adminID: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   required: true,
  // },
});

module.exports = policy;
