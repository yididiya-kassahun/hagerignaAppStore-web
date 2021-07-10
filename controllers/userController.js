exports.userDashboard = (req, res, next) => {
  res.render("User/homeDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};
exports.gamesPage = (req, res, next) => {
  res.render("User/games", {
    pageTitle: "AR Games Dashboard",
    path: "dashboard",
  });
};
exports.childrenPage = (req, res, next) => {
  res.render("User/children", {
    pageTitle: "Children Dashboard",
    path: "dashboard",
  });
};
exports.appCartPage = (req, res, next) => {
  res.render("User/appCart", {
    pageTitle: "App Cart Dashboard",
    path: "dashboard",
  });
};
exports.appDetail = (req, res, next) => {
  res.render("User/appDetail", {
    pageTitle: "App Detail",
    path: "Detail Dashboard",
  });
};

exports.editorChoicesPage = (req, res, next) => {
  res.render("User/editorsChoice", {
    pageTitle: "Editors Choice Dashboard",
    path: "Detail Dashboard",
  });
};
exports.devProfile = (req, res, next) => {
  res.render("User/devProfile", {
    pageTitle: "Developer Profile",
    path: "Profile Dashboard",
  });
};
exports.newReleasesPage = (req, res, next) => {
  res.render("User/newReleases", {
    pageTitle: "New Releases",
    path: "Profile Dashboard",
  });
};
