exports.developerDashboard = (req, res, next) => {
  res.render("Developer/devDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};
exports.createAppPage = (req, res, next) => {
  res.render("Developer/createApp", {
    pageTitle: "Create App Page",
    path: "dashboard",
  });
};
exports.devPolicy = (req, res, next) => {
  res.render("Developer/policies", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};
exports.reportPage = (req, res, next) => {
  res.render("Developer/generalReport", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};
