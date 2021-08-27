const Sequelize = require("sequelize");
const sequelize = require("../utils/database");
const bcrypt = require("bcryptjs");

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
    unique: true,
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
//   bcrypt
//     .hash("1234", 12)
//     .then((hashedPassword) => {
//       admin.create({
//         fullName: "yididiya",
//         Email: "admin@gmail.com",
//         role: 1,
//         password: hashedPassword,
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

module.exports = admin;
