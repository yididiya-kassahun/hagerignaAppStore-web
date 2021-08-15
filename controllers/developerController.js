const getPolicy = require("../models/addPolicy");
const createApps = require("../models/createApp");
const appstorelist = require("../models/appStorelist");
const apkDetail = require("../models/apkDetail");
const questionary = require("../models/addQuestionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const defaultLanguage = require("../models/defaultLanguage");
const androidAPI = require("../models/AndroidAPI");
const sizeOf = require("image-size");
const path = require("path");
const fs = require("fs");

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
  const videoURL = req.body.videoURL;

  const appIcon = req.files.appIcon;
  const featureGraphics = req.files.appFeatureGraphics;
  const phoneScreeenshoot = req.files.phoneScreeenshoots;

  const extensionName1 = path.extname(appIcon.name); // fetch the file extension
  const extensionName2 = path.extname(featureGraphics.name); // fetch the file extension
  const extensionName3 = path.extname(phoneScreeenshoot.name); // fetch the file extension
  const allowedExtension = [".png", "jpg", "jpeg"];

  if (
    !allowedExtension.includes(extensionName1) &&
    !allowedExtension.includes(extensionName2) &&
    !allowedExtension.includes(extensionName3)
  ) {
    console.log("Invalid extension name");
    return res.redirect("/store.listing");
  } else {
    const appIconPath = path.join("public/uploads/images/", appIcon.name);
    const featureGraphicsPath = path.join(
      "public/uploads/images/",
      featureGraphics.name
    );
    const phoneScreeenshootPath = path.join(
      "public/uploads/images/",
      phoneScreeenshoot.name
    );

    appIcon.mv(appIconPath, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");

      // **************** Check Uploaded Image Width and Height
      sizeOf(appIconPath, function (err, dimensions) {
        if (dimensions.width == 512 && dimensions.height == 512) {
          console.log(
            "Success image dimension Here" + dimensions.width,
            dimensions.height
          );
        } else {
          console.log("Failed Unsupported Image width and height");
          fs.unlinkSync(appIconPath);
          res.redirect("/store.listing");
        }
      });
    });

    featureGraphics.mv(featureGraphicsPath, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");
      // **************** Check Uploaded Image Width and Height
      sizeOf(featureGraphicsPath, function (err, dimensions) {
        if (dimensions.width == 1024 && dimensions.height == 500) {
          console.log(
            "Success image dimension Here" + dimensions.width,
            dimensions.height
          );
        } else {
          console.log("Failed Unsupported Image width and height");
          fs.unlinkSync(featureGraphicsPath);
          res.redirect("/store.listing");
        }
      });
    });
    phoneScreeenshoot.mv(phoneScreeenshootPath, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");
    });

    appstorelist
      .create({
        appName: appName,
        shortDescription: shortDescription,
        longDescription: longDescription,
        appIconURL: appIconPath,
        featureGraphicsURL: featureGraphicsPath,
        videoURL: videoURL,
        phoneScreeenshootURL: phoneScreeenshootPath,
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
  }
};

exports.apkFileDetail = (req, res, next) => {
  const appID = req.body.App_ID;
  const apkFileURL = req.files.apkFile;
  const packageName = req.body.packageName;
  const appVersion = req.body.appVersion;
  const api = req.body.api;

  if (!apkFileURL) {
    const error = new Error("please upload valid apk file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const extensionName = path.extname(apkFileURL.name); // fetch the file extension
  const allowedExtension = [".apk"];

  if (!allowedExtension.includes(extensionName)) {
    console.log("Invalid extension name");
    return res.redirect("/apk.detail");
  } else {
    // ********* check if apk size is below 1 MB ***********
    if (req.files.apkFile.size > 1024 * 1024) {
      const apkPath = path.join("public/uploads/apks/", apkFileURL.name);
      console.log("============" + apkPath);

      apkFileURL.mv(apkPath, (err) => {
        if (err) {
          console.log(err);
        }
        console.log("success! file moved ");
      });

      apkDetail
        .create({
          apkFile: apkPath,
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
    } else {
      console.log("Upload Failed APK is below minimum size !!!!");
    }
  }
};

exports.postQuestionary = (req, res, next) => {
  const appID = req.body.AppID;
  const questionID = req.body.questionID;
  const repliedAnswer = req.body.yesORno;

  questionary
    .findAll()
    .then((result) => {
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
