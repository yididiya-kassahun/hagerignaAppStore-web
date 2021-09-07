const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const developerType = sequelize.define("developerType", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  type: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
    unique: true,
  },
});

// developerType.sync().then(() => {
//   developerType.create({
//     type: "AR Developer",
//   });
//   developerType.create({
//     type: "VR Developer",
//   });
// });

module.exports = developerType;
