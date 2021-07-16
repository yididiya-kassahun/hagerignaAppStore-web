const developer = require("../models/register-developer");
const reviewer = require("../models/register-reviewer");
const user = require("../models/register-user");
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

  developer
    .create({
      fullName: fullName,
      Email: email,
      phoneNumber: phoneNumber,
      companyName: companyName,
      city: city,
      developerType: developerType,
      password: password,
    })
    .then((result) => {
      console.log(result);
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

  reviewer
    .create({
      fullName: fullName,
      Email: email,
      phoneNumber: phoneNumber,
      password: password,
    })
    .then((result) => {
      console.log(result);
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

  user
    .create({
      fullName: fullName,
      email: email,
      city: city,
      jobType: jobType,
      age: age,
      password:password
    })
    .then((result) => {
      console.log(result);
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
