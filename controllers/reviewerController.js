exports.reviewerDashboard = (req, res, next) => {
  res.render("Reviewer/reviewerDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};

exports.reviewAppPage = (req, res, next) => {
  res.render("Reviewer/reviewApp", {
    pageTitle: "Review App Dashboard",
    path: "dashboard",
  });
};

exports.editorsChoicePage = (req, res, next) => {
  res.render("Reviewer/editorChoices", {
    pageTitle: "Editor Choices Dashboard",
    path: "dashboard",
  });
};

exports.policyPage = (req, res, next) => {
  res.render("Reviewer/policies", {
    pageTitle: "policies Dashboard",
    path: "dashboard",
  });
};