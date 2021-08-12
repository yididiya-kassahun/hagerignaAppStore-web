const developer = require("../models/register-developer");
const reviewer = require("../models/register-reviewer");
const user = require("../models/register-user");
const roles = require("../models/roles");
const bcrypt = require("bcryptjs");
// **************  Registration Pages ******************

exports.userRegisterPage = (req, res, next) => {
  res.render("Auth/register-user", {
    pageTitle: "User Register Page",
    path: "Register",
  });
};
exports.developerRegisterPage = (req, res, next) => {
  res.render("Auth/register-developer", {
    pageTitle: "Developer Register Page",
    path: "Register",
  });
};

exports.reviewerRegisterPage = (req, res, next) => {
  res.render("Auth/register-reviewer", {
    pageTitle: "Reviewer Register Page",
    path: "Register",
  });
};

exports.developerSignUp = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const companyName = req.body.companyName;
  const city = req.body.city;
  const developerType = req.body.developerType;
  const password = req.body.password;

  roles
    .findAll({ where: { roleName: "developer" } })
    .then((role) => {
      developer
        .create({
          fullName: fullName,
          Email: email,
          phoneNumber: phoneNumber,
          companyName: companyName,
          city: city,
          developerType: developerType,
          role: role[0].id,
          password: password,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.reviewerSignup = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  // fetch ID from roles table where rolename = 'reviewer'
  roles
    .findAll({ where: { roleName: "reviewer" } })
    .then((role) => {
      reviewer
        .create({
          fullName: fullName,
          Email: email,
          phoneNumber: phoneNumber,
          password: password,
          role: role[0].id,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    }); 
};

exports.userSignup = (req, res, next) => {
  const fullName = req.body.userfullName;
  const email = req.body.userEmail;
  const city = req.body.userCity;
  const jobType = req.body.userJobType;
  const age = req.body.userAge;
  const password = req.body.password;
  roles
    .findAll({ where: { roleName: "user" } })
    .then((role) => {             
      user
        .create({
          fullName: fullName,
          email: email,
          city: city,
          jobType: jobType,
          age: age,
          role: role[0].id,
          password: password,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

// **************** Login Pages *******************

exports.loginPage = (req, res, next) => {
  res.render("Auth/login", {
    pageTitle: "Login Page",
    path: "login",
  });
};

exports.rolePage = (req, res, next) => {
  res.render("Auth/roles", {
    pageTitle: "Login Page",
    path: "login",
  });
};

