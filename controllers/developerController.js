const getPolicy = require("../models/addPolicy");
const appstorelist = require("../models/appStorelist");
const path = require("path");

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
exports.storeListing = (req, res, next) => {
  res.render("Developer/storeList", {
    pageTitle: "main app store listing Page",
    path: "dashboard",
  });
};
exports.appStoreList = (req, res, next) => {
  const appName = req.body.appName;
  const shortDescription = req.body.shortDescription;
  const longDescription = req.body.longDescription;
  const files = req.files;
  const videoURL = req.body.videoURL;
  // const featureGraphics = req.file;
  // const phoneScreeenshoots = req.file;

  // if (!appIcon) {
  //   console.log("not called");
  //   return res.status(422).render("Developer/storeList", {
  //     pageTitle: "main app store listing page",
  //     path: "/Developer/storeList",
  //     errorMessage: "Attached file is not correct",
  //   });
  // }

  const appIconURL = files[0].path;
  const featureGraphicsURL = files[1].path;
  const phoneScreeenshootURL = files[2].path;

  appstorelist
    .create({
      appName: appName,
      shortDescription: shortDescription,
      longDescription: longDescription,
      appIconURL: appIconURL,
      featureGraphicsURL: featureGraphicsURL,
      videoURL: videoURL,
      phoneScreeenshootURL: phoneScreeenshootURL,
      developerID: 2,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.appQuestionary = (req, res, next) => {
  res.render("Developer/questionaries", {
    pageTitle: "Questionaries",
    path: "dashboard",
  });
};
exports.devPolicy = (req, res, next) => {
  getPolicy
    .findAll()
    .then((policies) => {
      res.render("Developer/policies", {
        policyList: policies,
        pageTitle: "Get Policy Page",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.reportPage = (req, res, next) => {
  res.render("Developer/generalReport", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};
