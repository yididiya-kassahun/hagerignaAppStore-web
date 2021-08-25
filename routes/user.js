const express = require("express");

const userController = require("../controllers/userController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/user", userController.userDashboard);
router.get("/games", userController.gamesPage);
router.get("/children", userController.childrenPage);
router.get("/app.cart", userController.appCartPage);
router.get("/editors.choices", userController.editorChoicesPage);
router.get("/appDetail/:appID", userController.appDetail);
router.get("/userDownloadAPK/:apkFile", userController.downloadAPK);
router.get("/developer.profile", userController.devProfile);
router.get("/newReleases", userController.newReleasesPage);

module.exports = router;
