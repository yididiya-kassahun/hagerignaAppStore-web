const developer = require("../models/developer");
const reviewer = require("../models/reviewer");
const user = require("../models/user");
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
  //console.log("Email Address ===== " + emailAddress);
  return res.render("Auth/register-reviewer", {
    pageTitle: "Reviewer Register Page",
    path: "Register",
    email: req.params.email,
  });
};

// **************** Register Page ***********************

exports.developerSignUp = (req, res, next) => {
  const fullName = req.body.fullName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const companyName = req.body.companyName;
  const city = req.body.city;
  const developerType = req.body.developerType;
  const password = req.body.password;

  roles
    .findOne({ where: { roleName: "developer" } })
    .then((role) => {
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          developer
            .create({
              fullName: fullName,
              Email: email,
              phoneNumber: phoneNumber,
              companyName: companyName,
              city: city,
              developerType: developerType,
              role: role.id,
              password: hashedPassword,
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
    .findOne({ where: { roleName: "reviewer" } })
    .then((role) => {
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          reviewer
            .create({
              fullName: fullName,
              Email: email,
              phoneNumber: phoneNumber,
              password: hashedPassword,
              role: role.id,
            })
            .then((result) => {
              console.log(result);
              res.redirect("/login");
            })
            .catch((err) => {
              console.log(err);
            });
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
    .findOne({ where: { roleName: "user" } })
    .then((role) => {
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          user
            .create({
              fullName: fullName,
              email: email,
              city: city,
              jobType: jobType,
              age: age,
              role: role.id,
              password: hashedPassword,
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
    })
    .catch((err) => {
      console.log(err);
    });
};

// **************** Login Pages *******************

exports.loginPage = (req, res, next) => {
  res.render("Auth/login-user", {
    pageTitle: "Login Page",
    path: "login",
  });
};

exports.developerloginPage = (req, res, next) => {
  res.render("Auth/login-developer", {
    pageTitle: "Login Page",
    path: "login",
  });
};

exports.reviewerloginPage = (req, res, next) => {
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

exports.developerSignIn = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log("email = " + email + " pawword = " + password);
  developer
    .findOne({ where: { Email: email } })
    .then((developer) => {
      if (!developer) {
        res.redirect("/login.developer");
      }
      bcrypt
        .compare(password, developer.password)
        .then((doMatch) => {
          if (doMatch) {
            roles
              .findOne({ where: { id: developer.role } })
              .then((developerRole) => {
                if (developerRole) {
                  req.session.isLoggedIn = true;
                  req.session.developer = developer;
                  req.session.save();
                  res.redirect("/developer");
                } else {
                  console.log("Can't find the associated role.");
                  res.redirect("/login.developer");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            res.redirect("/login.developer");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
