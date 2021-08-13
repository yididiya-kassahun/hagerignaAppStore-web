const getPolicy = require("../models/addPolicy");
const createApps = require("../models/createApp");
const appstorelist = require("../models/appStorelist");
const apkDetail = require("../models/apkDetail");
const questionary = require("../models/addQuestionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const defaultLanguage = require("../models/defaultLanguage");
const androidAPI = require("../models/AndroidAPI");

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
  defaultLanguage
    .findAll()
    .then((language) => {
      res.render("Developer/createApp", {
        pageTitle: "Create App Page",
        languages: language,
        path: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.storeListing = (req, res, next) => {
  createApps
    .findAll()
    .then((createdApps) => {
      res.render("Developer/storeList", {
        pageTitle: "main app store listing Page",
        Apps: createdApps,
        androidAPIs: androidAPI,
        path: req.baseUrl,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteApp = (req, res, next) => {
  const deleteAppID = req.params.appID;
  createApps
    .findByPk(deleteAppID)
    .then((deleteAppID) => {
      deleteAppID.destroy();
    })
    .then((result) => {
      console.log("Created App Deleted Successfully!");
      res.redirect("/developer");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.appQuestionary = (req, res, next) => {
  createApps
    .findAll()
    .then((createdApps) => {
      // Join Two table in normal query then send it to the front end
      questionary
        .findAll()
        .then((questionList) => {
          res.render("Developer/questionaries", {
            pageTitle: "Questionaries",
            questions: questionList,
            //storedQuestions: storedQ,
            Apps: createdApps,
            path: req.baseUrl,
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
  createApps
    .findAll()
    .then((createdApps) => {
      androidAPI
        .findAll()
        .then((androidAPI) => {
          res.render("Developer/apkDetail", {
            pageTitle: "App APK Detail Page",
            Apps: createdApps,
            androidAPIs: androidAPI,
            path: req.baseUrl,
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
exports.reportPage = (req, res, next) => {
  res.render("Developer/generalReport", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};

exports.createApp = (req, res, next) => {
  const appName = req.body.AppName;
  const defaultLanguage = req.body.Language;
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
      res.redirect("/store.listing");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.appStoreList = (req, res, next) => {
  const AppID = req.body.Application;
  const appName = req.body.appName;
  const shortDescription = req.body.shortDescription;
  const longDescription = req.body.longDescription;
  const files = req.files;
  const videoURL = req.body.videoURL;

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
      appID: AppID,
      developerID: 2,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/apk.detail");
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.apkFileDetail = (req, res, next) => {
  const appID = req.body.App_ID;
  const apkFile = req.body.apkFile;
  const packageName = req.body.packageName;
  const appVersion = req.body.appVersion;
  const api = req.body.api;

  apkDetail
    .create({
      apkFile: apkFile,
      packageName: packageName,
      appVersion: appVersion,
      API_Req: api,
      appID: appID,
      developerID: 3,
    })
    .then((result) => {
      console.log(result);
      res.redirect("/app.questionary");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postQuestionary = (req, res, next) => {
  const appID = req.body.AppID;
  const questionID = req.body.questionID;
  const repliedAnswer = req.body.yesORno;

  questionary
    .findAll()
    .then((result) => {
      //  console.log(result.length);
      for (let i = 0; i < result.length; i++) {
        return answeredQuestionary.create({
          appID: appID,
          questionID: questionID[i],
          yesOrno: repliedAnswer[i],
          developerID: 3,
        });
      }
    })
    .then((answer) => {
      //  console.log(answer.appID);
      createApps
        .findOne({ where: { appID: answer.appID } })
        .then((createAppID) => {
          if (createAppID) {
            console.log("succeed");
            appstorelist
              .findOne({ where: { appID: createAppID.appID } })
              .then((appList) => {
                if (appList) {
                  console.log("succeed app store list");
                  apkDetail
                    .findOne({ where: { appID: appList.appID } })
                    .then((apkList) => {
                      if (apkList) {
                        console.log("success apk file");
                      } else {
                        console.log("failed apk file");
                      }
                    });
                } else {
                  console.log("succeed app store failed");
                }
              });
          } else {
            console.log("failed");
          }
        })
        .catch((err) => {});
      res.redirect("/app.questionary");
    })
    .catch((err) => {
      console.log(err);
    });
  // .catch((err) => {});
  //  res.redirect("/app.questionary");
};

exports.rolloutApp = (req, res, next) => {
  //const appID = req.body.appID;
  console.log("============= clicked");
};
