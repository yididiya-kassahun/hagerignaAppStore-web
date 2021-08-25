const publishedApps = require("../models/createApp");
const publishedAPK = require("../models/apkDetail");
const storeList = require("../models/appStorelist");

exports.userDashboard = (req, res, next) => {
  publishedApps
    .findAll({ where: { isPublished: true, appStatus: "published" } })
    .then((allPublishedApps) => {
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
              // publishedApps
              //   .findAll({
              //     limit: 4,
              //     include:[storeList],
              //     where: { appStatus: "published" },
              //   })
              //   .then((apps) => {
              res.render("User/appDetail", {
                pageTitle: "App Detail",
                path: "Detail Dashboard",
                publishedAPP: publishedApp,
                publishedAPK: publishedApk,
                storeAPP: storeListing,
              });
              // })
              // .catch((err) => {});
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
      const apkPath = apk.apkFile;
      res.download(apkPath);
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
  res.render("User/devProfile", {
    pageTitle: "Developer Profile",
    path: "Profile Dashboard",
  });
};
exports.newReleasesPage = (req, res, next) => {
  res.render("User/newReleases", {
    pageTitle: "New Releases",
    path: "Profile Dashboard",
  });
};
