const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

const defaultLanguage = sequelize.define("defaultLanguage", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
    required: true,
  },
});

// defaultLanguage.sync().then(() => {
//   defaultLanguage.create({
//     language: "Amharic",
//   });
//   defaultLanguage.create({
//     language: "Oromic",
//   });
//   defaultLanguage.create({
//     language: "Afar",
//   });
//   defaultLanguage.create({
//     language: "Tigrigna",
//   });
//   defaultLanguage.create({
//     language: "Somali",
//   });
//   defaultLanguage.create({
//     language: "Sidama",
//   });
//   defaultLanguage.create({
//     language: "Gurage",
//   });
//   defaultLanguage.create({
//     language: "Sheka",
//   });
// });

module.exports = defaultLanguage;
