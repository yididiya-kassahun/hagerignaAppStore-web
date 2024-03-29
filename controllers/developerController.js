const sizeOf = require("image-size");
const path = require("path");
const fs = require("fs");
const PDFDocument = require("pdfkit");

const getPolicy = require("../models/policy");
const createApps = require("../models/createApp");
const appstorelist = require("../models/appStorelist");
const apkDetail = require("../models/apkDetail");
const questionary = require("../models/questionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const defaultLanguage = require("../models/defaultLanguage");
const androidAPI = require("../models/AndroidAPI");
const appComment = require("../models/appComment");
const appDownload = require("../models/appDownload");
const developer = require("../models/developer");

var moment = require("moment");

exports.developerDashboard = (req, res, next) => {
  createApps
    .findAll({ where: { developerID: req.session.developer.id } })
    .then((createdApps) => {
      createApps
        .count({
          where: {
            appStatus: "published",
            developerID: req.session.developer.id,
          },
        })
        .then((totalPublishedApps) => {
          createApps
            .count({
              where: {
                appStatus: "rejected",
                developerID: req.session.developer.id,
              },
            })
            .then((totalRejectedApps) => {
              createApps
                .count({
                  where: {
                    developerID: req.session.developer.id,
                  },
                })
                .then((totalUploads) => {
                  res.render("Developer/devDashboard", {
                    pageTitle: "main Dashboard",
                    appsList: createdApps,
                    path: req.baseUrl,
                    totalPublishedApps: totalPublishedApps,
                    totalRejectedApps: totalRejectedApps,
                    totalUploads: totalUploads,
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
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.appDetailPage = (req, res, next) => {
  const applicationID = req.params.appID;

  appstorelist
    .findOne({ where: { appID: applicationID } })
    .then((appDetailData) => {
      apkDetail
        .findOne({ where: { appID: applicationID } })
        .then((appAPK) => {
          appComment
            .findAll({ where: { appID: applicationID } })
            .then((commentList) => {
              appComment
                .count({ where: { appID: applicationID } })
                .then((totalComment) => {
                  res.render("Developer/applicationDetail", {
                    pageTitle: "Application Dashboard",
                    path: "dashboard",
                    appData: appDetailData,
                    appAPK: appAPK,
                    appComments: commentList,
                    totalComment: totalComment,
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
        path: "/create.app",
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.storeListing = (req, res, next) => {
  createApps
    .findAll({ where: { developerID: req.session.developer.id } })
    .then((createdApps) => {
      res.render("Developer/storeList", {
        pageTitle: "main app store listing Page",
        Apps: createdApps,
        androidAPIs: androidAPI,
        path: req.baseUrl,
        editing: false,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.editStoreListing = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const appID = req.params.appID;
  appstorelist.findByPk(appID).then((listedApp) => {
    if (!listedApp) {
      return res.redirect("/store.listing");
    }
    createApps
      .findAll()
      .then((createdApps) => {
        res.render("Developer/storeList", {
          pageTitle: "main app store listing Page",
          Apps: createdApps,
          androidAPIs: androidAPI,
          path: req.baseUrl,
          editing: true,
          editApp: listedApp,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.deleteApp = (req, res, next) => {
  const deleteAppID = req.params.appID;
  createApps
    .findByPk(deleteAppID)
    .then((deleteApp) => {
      appstorelist
        .findOne({
          where: { appID: deleteAppID, developerID: req.session.developer.id },
        })
        .then((deleteAppStorList) => {
          deleteAppStorList.destroy();
          apkDetail
            .findOne({ where: { appID: deleteAppID } })
            .then((deleteAPK) => {
              if (deleteAPK) {
                deleteAPK.destroy();
                console.log("App Deleted Successfully!!!!");
              } else {
                console.log("Failed to Deleted App!!");
              }
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
      deleteApp.destroy();
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
    .findAll({ where: { developerID: req.session.developer.id } })
    .then((createdApps) => {
      // Join Two table in normal query then send it to the front end
      questionary
        .findAll()
        .then((questionList) => {
          res.render("Developer/questionaries", {
            pageTitle: "Questionaries",
            questions: questionList,
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
    .findAll({ where: { developerID: req.session.developer.id } })
    .then((createdApps) => {
      androidAPI
        .findAll()
        .then((androidAPI) => {
          res.render("Developer/apkDetail", {
            pageTitle: "App APK Detail Page",
            Apps: createdApps,
            androidAPIs: androidAPI,
            path: req.baseUrl,
            editing: false,
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

exports.editApkDetailPage = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/apk.detail");
  }
  const appID = req.params.appID;
  apkDetail.findOne({ where: { appID: appID } }).then((apkDetail) => {
    if (!apkDetail) {
      return res.redirect("/apk.detail");
    }
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
              editing: true,
              editApp: apkDetail,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.reportPage = (req, res, next) => {
  createApps
    .findAll({
      where: { isPublished: true, developerID: req.session.developer.id },
    })
    .then((allApps) => {
      apkDetail
        .findAll({ where: { developerID: req.session.developer.id } })
        .then((allAPKs) => {
          res
            .render("Developer/generalReport", {
              pageTitle: "Policy Page",
              path: "dashboard",
              allApps: allApps,
              allAPKs: allAPKs,
              moment: moment,
            })
            .catch((err) => console.log(err));
        });
    })
    .catch((err) => console.log(err));
};

exports.generateReport = (req, res, next) => {
  createApps
    .findAll({
      where: { isPublished: true, developerID: req.session.developer.id },
    })
    .then((allApps) => {
      apkDetail
        .findAll({ where: { developerID: req.session.developer.id } })
        .then((allAPKs) => {
          console.log("path =========> " + path.relative);
          var date = new Date(); // some mock date
          var milliseconds = date.getTime();
          const reportName =
            "appReport-" + req.session.developer.id + milliseconds + ".pdf";
          const reportPath = path.join("public", "report", reportName);

          const pdfDoc = new PDFDocument();
          res.setHeader("Content-Type", "application/pdf");
          res.setHeader(
            "Content-Disposition",
            'inline; filename="' + reportName + '"'
          );
          pdfDoc.pipe(fs.createWriteStream(reportPath));
          pdfDoc.pipe(res);

          pdfDoc.image(
            "C:/Users/User/Desktop/Final Project/project/hagerignAppStore/public/img/avatar3.png"
          );
          pdfDoc.fontSize(26).text("Hagerigna  Appstore");

          pdfDoc.fontSize(16).text("Developer General Report");
          pdfDoc.text("_______________________________________________");
          pdfDoc.text(" ");
          pdfDoc.text(" ");
          pdfDoc.fontSize(15).text("Total Published AR Applications");
          pdfDoc.text(" ");
          pdfDoc.text(" ");
          allApps.forEach((apps) => {
            pdfDoc.text("App Name ---------------" + apps.appName);
            pdfDoc.text("Default Language ------- " + apps.defaultLanguage);
            pdfDoc.text(
              "Published At ---------" +
                moment(apps.createdAt).format("Do MMMM, YYYY")
            );
            pdfDoc.text("No of Download ------------" + apps.downloads);
          });

          pdfDoc.text(" ");
          pdfDoc.text(" ");
          pdfDoc.fontSize(15).text("Total Published AR Applications APK Size", {
            underline: true,
          });
          allAPKs.forEach((apks) => {
            pdfDoc.text("Package Name -----------" + apks.packageName);
            pdfDoc.text("APK Size --------------- " + apks.apkSize);
            pdfDoc.text("App Version ------------" + apks.appVersion);
            pdfDoc.text("API Requirement --------" + apks.API_Req);
          });
          pdfDoc.end();
        });
    })
    .catch((err) => console.log(err));
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
      developerID: req.session.developer.id,
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
  const phoneScreenshoot1 = req.files.phoneScreenshoot1;
  const phoneScreenshoot2 = req.files.phoneScreenshoot2;
  const phoneScreenshoot3 = req.files.phoneScreenshoot3;

  //console.log("here is phone screenshot2 " + phoneScreenshoot[0]);

  const extensionName1 = path.extname(appIcon.name); // fetch the file extension
  const extensionName2 = path.extname(featureGraphics.name);
  const extensionName3 = path.extname(phoneScreenshoot1.name);
  const extensionName4 = path.extname(phoneScreenshoot2.name);
  const extensionName5 = path.extname(phoneScreenshoot3.name);
  const allowedExtension = [".png", ".jpg", ".jpeg"];

  if (
    !allowedExtension.includes(extensionName1) &&
    !allowedExtension.includes(extensionName2) &&
    !allowedExtension.includes(extensionName3) &&
    !allowedExtension.includes(extensionName4) &&
    !allowedExtension.includes(extensionName5)
  ) {
    console.log("Invalid extension name");
    return res.redirect("/store.listing");
  } else {
    const appIconPath = path.join("public/uploads/images/", appIcon.name);
    const appIconPath2 = path.join("/uploads/images/", appIcon.name);

    const featureGraphicsPath = path.join(
      "public/uploads/images/",
      featureGraphics.name
    );
    const featureGraphicsPath2 = path.join(
      "/uploads/images/",
      featureGraphics.name
    );
    const phoneScreenshootPath1 = path.join(
      "public/uploads/images/",
      phoneScreenshoot1.name
    );
    const phoneScreenshootPath2 = path.join(
      "public/uploads/images/",
      phoneScreenshoot2.name
    );
    const phoneScreenshootPath3 = path.join(
      "public/uploads/images/",
      phoneScreenshoot3.name
    );
    const phoneScreenshootPath_1 = path.join(
      "/uploads/images/",
      phoneScreenshoot1.name
    );
    const phoneScreenshootPath_2 = path.join(
      "/uploads/images/",
      phoneScreenshoot2.name
    );
    const phoneScreenshootPath_3 = path.join(
      "/uploads/images/",
      phoneScreenshoot3.name
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
          res.redirect("/developer");
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

    phoneScreenshoot1.mv(phoneScreenshootPath1, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");
    });

    phoneScreenshoot2.mv(phoneScreenshootPath2, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");
    });
    phoneScreenshoot3.mv(phoneScreenshootPath3, (err) => {
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
        appIconURL: appIconPath2,
        featureGraphicsURL: featureGraphicsPath2,
        videoURL: videoURL,
        phoneScreeenshootURL1: phoneScreenshootPath_1,
        phoneScreeenshootURL2: phoneScreenshootPath_2,
        phoneScreeenshootURL3: phoneScreenshootPath_3,
        appID: AppID,
        developerID: req.session.developer.id,
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
  const apkFileSize = parseFloat(req.files.apkFile.size / 1024 / 1024).toFixed(
    2
  );

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
          apkSize: apkFileSize,
          appID: appID,
          developerID: req.session.developer.id,
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
      for (let i = 0; i < questionID.length; i++) {
        answeredQuestionary.create({
          appID: appID,
          questionID: questionID[i],
          yesOrno: repliedAnswer[i],
          developerID: req.session.developer.id,
        });
      }
      return appID;
    })
    .then((answer) => {
      console.log("************" + answer);
      // -------------| Check if all forms are submitted
      createApps
        .findOne({ where: { appID: answer } })
        .then((createAppID) => {
          createAppID.appStatus = "Roll out";
          createAppID.save();
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
                        // ************* set isPublished true
                        createApps
                          .findByPk(answer)
                          .then((updatedApp) => {
                            updatedApp.appIcon = appList.appIconURL;
                            updatedApp.isPublished = true;
                            updatedApp.save();
                            res.redirect("/developer");
                          })
                          .catch((err) => {
                            console.log(err);
                          });
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
      res.redirect("/developer");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.developerProfile = (req, res, next) => {
  const developerProfile = req.session.developer;
  res.render("Developer/developerProfile", {
    pageTitle: "profile Dashboard",
    path: "dashboard",
    devProfile: developerProfile,
  });
};

exports.editDeveloperProfile = (req, res, next) => {
  const developerID = req.params.devID;

  const profilImage = req.files.profilePicture;

  const extensionName1 = path.extname(profilImage.name); // fetch the file extension
  console.log("extenssion name ===============" + extensionName1);

  const allowedExtension = [".png", ".jpg", ".jpeg"];

  if (!allowedExtension.includes(extensionName1)) {
    console.log("Invalid extension name");
    return res.redirect("/devprofile");
  } else {
    const profilePicturePath = path.join(
      "public/uploads/profileImage/",
      profilImage.name
    );

    const profilePicturePath2 = path.join(
      "/uploads/profileImage/",
      profilImage.name
    );

    profilImage.mv(profilePicturePath, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("success! file moved ");

      // **************** Check Uploaded Image Width and Height
      sizeOf(profilePicturePath, function (err, dimensions) {
        if (dimensions.width <= 500 && dimensions.height <= 500) {
          console.log(
            "Success image dimension Here" + dimensions.width,
            dimensions.height
          );
        } else {
          console.log("Failed Unsupported Image width and height");
          fs.unlinkSync(profilePicturePath);
          res.redirect("/devprofile");
        }
      });
    });
    developer
      .findByPk(developerID)
      .then((developerData) => {
        console.log("profile pic ===============" + developerData.profilePic);
        developerData.profilePic = profilePicturePath2;
        developerData.save();
      })
      .catch((err) => {
        console.log(err);
      });
    res.redirect("/devprofile");
  }
};

exports.appDataChart = (req, res, next) => {
  const appID = req.params.appID;

  appDownload
    .count({
      attributes: ["createdAt"],
      group: "createdAt",
      where: { appID: appID },
    })
    .then((appStat) => {
      console.log(appStat);
      res.json({
        allApps: appStat,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
