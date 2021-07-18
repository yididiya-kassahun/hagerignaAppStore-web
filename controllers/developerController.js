const getPolicy = require("../models/addPolicy");
const appstorelist = require("../models/appStorelist");
const createApps = require("../models/createApp");
const questionary = require("../models/addQuestionary");
var moment = require("moment");

exports.developerDashboard = (req, res, next) => {
  createApps
    .findAll()
    .then((createdApps) => {
      res.render("Developer/devDashboard", {
        pageTitle: "main Dashboard",
        appsList: createdApps,
        path: req.baseUrl,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
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

exports.createApp = (req, res, next) => {
  const appName = req.body.AppName;
  const defaultLanguage = req.body.defaultLanguage;
  const isApporGame = req.body.ApporGame;
  const isFreeorPaid = req.body.free_paid;
  
  createApps
    .create({
      appName: appName,
      appIcon: "defaultAppIcon.png",
      defaultLanguage: defaultLanguage,
      isApporGame: isApporGame,
      isPaidorFree: isFreeorPaid,
      developerID: 3,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
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
  questionary
    .findAll()
    .then((questionList) => {
      res.render("Developer/questionaries", {
        pageTitle: "Questionaries",
        questions: questionList,
        path: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
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
exports.apkDetailPage = (req, res, next) => {
  res.render("Developer/apkDetail", {
    pageTitle: "APK Detail Page",
    path: "dashboard",
  });
};
exports.reportPage = (req, res, next) => {
  res.render("Developer/generalReport", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};
