const onReviewApp = require("../models/createApp");
var moment = require("moment");

exports.reviewerDashboard = (req, res, next) => {
  onReviewApp
    .findAll({ where: { isPublished: true } })
    .then((apps) => {
      res.render("Reviewer/reviewerDashboard", {
        pageTitle: "main Dashboard",
        path: "dashboard",
        allApps: apps,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.reviewAppPage = (req, res, next) => {
  const appID = req.params.appID;
  onReviewApp
    .findOne({ where: { appID: appID } })
    .then()
    .catch((err) => {
      console.log(err);
    });
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
