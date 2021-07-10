exports.adminDashboard = (req, res, next) => {
  res.render("SupAdmin/supAdminDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};

exports.developersListPage = (req, res, next) => {
  res.render("SupAdmin/developers", {
    pageTitle: "DEvelopers Dashboard",
    path: "dashboard",
  });
};
exports.reviewerList = (req, res, next) => {
  res.render("SupAdmin/reviewers", {
    pageTitle: "Reviewers page",
    path: "dashboard",
  });
}; ;
exports.ordinaryUsersPage = (req, res, next) => {
  res.render("SupAdmin/usersListPage", {
    pageTitle: "Users List page",
    path: "dashboard",
  });
};
exports.policyPage = (req, res, next) => {
  res.render("SupAdmin/policyPage", {
    pageTitle: "Policy & Regulation page",
    path: "dashboard",
  });
};


