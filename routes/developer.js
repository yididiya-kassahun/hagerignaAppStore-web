const express = require("express");

const developerController = require("../controllers/developerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/developer", developerController.developerDashboard);
router.get("/report", developerController.reportPage);
router.get("/policies", developerController.devPolicy);
router.get("/create.app", developerController.createAppPage);
router.get("/apk.detail", developerController.apkDetailPage);
router.get("/store.listing", developerController.storeListing);
router.get("/app.questionary", developerController.appQuestionary);
//router.get("/create.app/:appID", developerController.appDetailss);
router.post("/create.app", developerController.createApp);
router.post("/deleteApp/:appID", developerController.deleteApp);
router.post("/app.storeList", developerController.appStoreList);
router.post("/upload.apk",developerController.apkFileDetail);
router.post("/post.questionary", developerController.postQuestionary);
router.post("/rolloutApp",developerController.rolloutApp);
module.exports = router;
