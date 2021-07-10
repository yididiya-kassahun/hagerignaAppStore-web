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

// **************** Login Pages *******************

exports.loginPage = (req, res, next) => {
  res.render("Auth/login", {
    pageTitle: "Login Page",
    path: "login",
  });
};
