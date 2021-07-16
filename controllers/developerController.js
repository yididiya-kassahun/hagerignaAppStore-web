const getPolicy = require("../models/addPolicy");
const appstorelist = require("../models/appStorelist");

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
    pageTitle: "main store listing Page",
    path: "dashboard",
  });
};
exports.appStoreList = (req, res, next) => {
  const appName = req.body.appName;
  const shortDescription = req.body.shortDescription;
  const longDescription = req.body.longDescription;
  const appIcon = req.file;
  // const featureGraphics = req.file;
  // const videoURL = req.body.videoURL;
  // const phoneScreeenshoots = req.file;
  console.log(appIcon);
  // appstorelist
  //   .create({
         
  //   })
  //   .then((result) => {
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
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
