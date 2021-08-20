const getPolicy = require("../models/addPolicy");
const onReviewApp = require("../models/createApp");
const appStoreListing = require("../models/appStorelist");
const appQuestionary = require("../models/addQuestionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const appAPKFile = require("../models/apkDetail");
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
    .then((storeList) => {
      appAPKFile
        .findOne({ where: { appID: appID } })
        .then((apkFile) => {
          onReviewApp
            .findOne({ where: { appID: appID } })
            .then((reviewApplication) => {
              appQuestionary
                .findAll()
                .then((questionary) => {
                  answeredQuestionary
                    .findAll({ where: { appID: appID } })
                    .then((answeredQ) => {
                      res.render("Reviewer/reviewApp", {
                        pageTitle: "Review App Dashboard",
                        path: "dashboard",
                        reviewApp: reviewApplication,
                        storeList: storeList,
                        questionary: questionary,
                        answeredQ: answeredQ,
                        apkFile: apkFile,
                      });
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
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.downloadAPKFile = (req, res, next) => {
  const apkID = req.params.apkFile;
  //console.log(apkPath);
  appAPKFile
    .findOne({ where: { id: apkID } })
    .then((apk) => {
      const apkPath = apk.apkFile;
      res.download(apkPath);
    })
    .catch((err) => {});
};
exports.editorsChoicePage = (req, res, next) => {
  res.render("Reviewer/editorChoices", {
    pageTitle: "Editor Choices Dashboard",
    path: "dashboard",
  });
};

exports.policyPage = (req, res, next) => {
  getPolicy
    .findAll()
    .then((policies) => {
      res.render("Reviewer/policies", {
        policyList: policies,
        pageTitle: "policies Page",
      });
    })
    .catch((err) => {
      console.log(err);
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
