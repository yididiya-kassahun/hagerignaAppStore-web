const onReviewApp = require("../models/createApp");
const appStoreListing = require("../models/appStorelist");
const reviewApp = require("../models/reviewApp");
var moment = require("moment");

exports.reviewerDashboard = (req, res, next) => {
  onReviewApp
    .findAll({
      where: { isPublished: true, appStatus: "on Review", reviewerID: 3 },
    })
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

exports.publicAppCart = (req, res, next) => {
  onReviewApp
    .findAll({ where: { isPublished: true, appStatus: "Roll out" } })
    .then((apps) => {
      res.render("Reviewer/publicCart", {
        pageTitle: "cart Dashboard",
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
  appStoreListing
    .findOne({ where: { appID: appID } })
    .then(storeList => {
       onReviewApp
         .findOne({ where: { appID: appID } })
         .then((reviewApplication) => {
           res.render("Reviewer/reviewApp", {
             pageTitle: "Review App Dashboard",
             path: "dashboard",
             reviewApp: reviewApplication,
             storeList: storeList,
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

exports.addToCart = (req, res, next) => {
  const appID = req.params.reviewAppID;

  onReviewApp
    .findOne({ where: { appID: appID } })
    .then((App) => {
      App.appStatus = "on Review";
      App.reviewerID = 3;
      App.save();
      res.redirect("/publicCart");
    })
    .catch((err) => {
      console.log(err);
    });
};
