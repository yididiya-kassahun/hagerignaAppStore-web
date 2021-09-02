const publishedApps = require("../models/createApp");
const publishedAPK = require("../models/apkDetail");
const storeList = require("../models/appStorelist");
const appcomment = require("../models/appComment");
const appDownload = require("../models/appDownload");
const developer = require("../models/developer");
const appWishList = require("../models/appWishList");

exports.userDashboard = (req, res, next) => {
  publishedApps
    .findAll({
      include: [
        {
          model: developer,
        },
      ],
      where: { isPublished: true, appStatus: "published" },
    })
    .then((allPublishedApps) => {
      // allPublishedApps.forEach((element) => {
      //   console.log(element.developer.fullName);
      // });
      res.render("User/homeDashboard", {
        pageTitle: "main Dashboard",
        path: "dashboard",
        publishedApps: allPublishedApps,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.gamesPage = (req, res, next) => {
  res.render("User/games", {
    pageTitle: "AR Games Dashboard",
    path: "dashboard",
  });
};
exports.childrenPage = (req, res, next) => {
  res.render("User/children", {
    pageTitle: "Children Dashboard",
    path: "dashboard",
  });
};
exports.appCartPage = (req, res, next) => {
  res.render("User/appCart", {
    pageTitle: "App Cart Dashboard",
    path: "dashboard",
  });
};
exports.appDetail = (req, res, next) => {
  const applicationID = req.params.appID;

  publishedApps
    .findOne({
      where: {
        appID: applicationID,
        isPublished: true,
        appStatus: "published",
      },
    })
    .then((publishedApp) => {
      publishedAPK
        .findOne({ where: { appID: applicationID } })
        .then((publishedApk) => {
          storeList
            .findOne({ where: { appID: applicationID } })
            .then((storeListing) => {
              storeList
                .findAll({
                  where: { isPublished: true },
                  order: [["createdAt", "DESC"]],
                })
                .then((apps) => {
                  appcomment
                    .findAll({ where: { appID: applicationID } })
                    .then((commentList) => {
                      res.render("User/appDetail", {
                        pageTitle: "App Detail",
                        path: "Detail Dashboard",
                        publishedAPP: publishedApp,
                        publishedAPK: publishedApk,
                        storedAPP: storeListing,
                        otherApps: apps,
                        comments: commentList,
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

exports.downloadAPK = (req, res, next) => {
  const apkID = req.params.apkFile;

  publishedAPK
    .findOne({ where: { appID: apkID } })
    .then((apk) => {
      appDownload
        .create({
          appDownloaded: true,
          appID: apkID,
          userID: req.session.user.id,
        })
        .then((app) => {
          const apkPath = apk.apkFile;
          res.download(apkPath);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {});
};

exports.editorChoicesPage = (req, res, next) => {
  res.render("User/editorsChoice", {
    pageTitle: "Editors Choice Dashboard",
    path: "Detail Dashboard",
  });
};
exports.devProfile = (req, res, next) => {
  const developerID = req.params.developerID;

  storeList
    .findAll({
      include: [
        {
          model: developer,
        },
      ],
      where: { isPublished: true, developerID: developerID },
    })
    .then((allApp) => {
      allApp.forEach((element) => {
        console.log(element);
      });
      developer
        .findByPk(developerID)
        .then((developer) => {
          res.render("User/devProfile", {
            pageTitle: "Developer Profile",
            path: "Profile Dashboard",
            profile: developer,
            developerData: allApp,
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
exports.newReleasesPage = (req, res, next) => {
  res.render("User/newReleases", {
    pageTitle: "New Releases",
    path: "Profile Dashboard",
  });
};

exports.addComment = (req, res, next) => {
  const appID = req.params.appID;
  const addcomment = req.body.comment;

  appcomment
    .create({
      comment: addcomment,
      appID: appID,
      fullName: req.session.user.fullName,
      userID: 4,
    })
    .then((comment) => {
      console.log(comment);
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addToWishList = (req, res, next) => {
  const appID = req.params.appID;

  appWishList
    .create({
      appID: appID,
    })
    .then((result) => {
      res.redirect("/user");
    })
    .catch((err) => {
      console.log(err);
    });
};
