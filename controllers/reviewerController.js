const getPolicy = require("../models/policy");
const onReviewApp = require("../models/createApp");
const appStoreListing = require("../models/appStorelist");
const appQuestionary = require("../models/questionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const appAPKFile = require("../models/apkDetail");
const reviewApp = require("../models/reviewApp");
const developerProfile = require("../models/developer");
const createApps = require("../models/createApp");
var moment = require("moment");

exports.reviewerDashboard = (req, res, next) => {
  onReviewApp
    .findAll({
      where: {
        isPublished: true,
        appStatus: "on Review",
        reviewerID: req.session.reviewer.id,
      },
    })
    .then((apps) => {
      createApps
        .count({
          where: {
            appStatus: "published",
            reviewerID: req.session.reviewer.id,
          },
        })
        .then((totalPublishedApps) => {
          createApps
            .count({
              where: {
                appStatus: "rejected",
                reviewerID: req.session.reviewer.id,
              },
            })
            .then((totalRejectedApps) => {
              res.render("Reviewer/reviewerDashboard", {
                pageTitle: "main Dashboard",
                path: "dashboard",
                allApps: apps,
                totalPublishedApps: totalPublishedApps,
                totalRejectedApps:totalRejectedApps,
                moment: moment,
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

exports.approvedApps = (req, res, next) => {
  onReviewApp
    .findAll({
      where: {
        isPublished: true,
        appStatus: "published",
        reviewerID: req.session.reviewer.id,
      },
    })
    .then((approvedApps) => {
      res.render("Reviewer/approvedApps", {
        pageTitle: "approved apps Dashboard",
        path: "dashboard",
        allApprovedApps: approvedApps,
        moment: moment,
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
                      developerProfile
                        .findOne({
                          where: { id: reviewApplication.developerID },
                        })
                        .then((developerProfile) => {
                          res.render("Reviewer/reviewApp", {
                            pageTitle: "Review App Dashboard",
                            path: "dashboard",
                            reviewApp: reviewApplication,
                            storeList: storeList,
                            questionary: questionary,
                            developer: developerProfile,
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
      App.reviewerID = req.session.reviewer.id;
      App.save();
      res.redirect("/publicCart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.approvedReviewResult = (req, res, next) => {
  const appID = req.body.AppID;
  const approvmentSummery = req.body.summery;
  const editorChoice = Boolean(req.body.editorChoice);

  console.log("============ " + editorChoice);
  reviewApp
    .create({
      appID: appID,
      approved: true,
      summery: approvmentSummery,
      editorChoice: editorChoice,
      reviewerID: req.session.reviewer.id,
    })
    .then((result) => {
      onReviewApp
        .findOne({
          where: {
            appID: result.appID,
            isPublished: true,
            reviewerID: req.session.reviewer.id,
          },
        })
        .then((appData) => {
          appData.appStatus = "published";
          appData.save();
          appStoreListing
            .findOne({ where: { appID: result.appID } })
            .then((appList) => {
              appList.isPublished = true;
              appList.save();
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(result);
      res.redirect("/reviewer");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.disapprovedReviewResult = (req, res, next) => {
  const appID = req.body.AppID;
  const disapprovmentSummery = req.body.summery;

  reviewApp
    .create({
      appID: appID,
      disapproved: true,
      summery: disapprovmentSummery,
      reviewerID: req.session.reviewer.id,
    })
    .then((result) => {
      onReviewApp
        .findOne({
          where: {
            appID: result.appID,
            isPublished: true,
            reviewerID: req.session.reviewer.id,
          },
        })
        .then((appData) => {
          appData.appStatus = "rejected";
          appData.save();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(result);
      res.redirect("/reviewer");
    })
    .catch((err) => {
      console.log(err);
    });
};
