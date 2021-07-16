const Sequelize = require("sequelize");

const sequelize = new Sequelize("hagerignaDB", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
