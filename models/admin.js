const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const admin = sequelize.define("Admin", {
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
    unique:true
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

// admin.sync().then(() => {
//   admin.create({
//     fullName: "yididiya",
//     Email: "yididiya@gmail.com",
//     role: 1,
//     password: "12345",
//   });
// });

module.exports = admin;
