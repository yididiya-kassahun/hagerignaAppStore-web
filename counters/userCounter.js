const user = require("../models/user");

module.exports.countUsers = function coutUsers() {
  return user
    .count()
    .then((users) => {
        console.log(users);
    })
    .catch((err) => {
      console.log(err);
    });
};
