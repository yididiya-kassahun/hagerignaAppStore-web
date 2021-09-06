const express = require("express");
const isAuth = require("../middleware/isAuth");

const developerController = require("../controllers/developerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/developer", isAuth, developerController.developerDashboard);
router.get("/report", isAuth, developerController.reportPage);
router.get("/policies", isAuth, developerController.devPolicy);

router.get("/create.app", isAuth, developerController.createAppPage);
router.get("/apk.detail", isAuth, developerController.apkDetailPage);
router.get(
  "/edit.apkDetail/:appID",
  isAuth,
  developerController.editApkDetailPage
);

router.get("/store.listing", isAuth, developerController.storeListing);
router.get(
  "/edit.storeListing/:appID",
  isAuth,
  developerController.editStoreListing
);

router.get(
  "/chartDownloadData/:appID",
  isAuth,
  developerController.appDataChart
);
router.get("/generateReport", isAuth, developerController.generateReport);

router.get("/app.questionary", isAuth, developerController.appQuestionary);
router.get("/app.detail/:appID", isAuth, developerController.appDetailPage);
router.get("/devprofile", isAuth, developerController.developerProfile);
//router.get("/editDevprofile/:devID", isAuth, developerController.editDeveloperProfile);
//router.get("/create.app/:appID", developerController.appDetailss);

router.post("/create.app", isAuth, developerController.createApp);
router.post("/deleteApp/:appID", isAuth, developerController.deleteApp);
router.post("/app.storeList", isAuth, developerController.appStoreList);
router.post("/upload.apk", isAuth, developerController.apkFileDetail);
router.post("/post.questionary", isAuth, developerController.postQuestionary);
router.post(
  "/edit.developerProfile/:devID",
  isAuth,
  developerController.editDeveloperProfile
);

module.exports = router;
