const express = require("express");

const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/user",isAuth, userController.userDashboard);
router.get("/games", isAuth, userController.gamesPage);
router.get("/children", isAuth, userController.childrenPage);
router.get("/app.cart", isAuth, userController.appCartPage);
router.get("/editors.choices", isAuth, userController.editorChoicesPage);
router.get("/appDetail/:appID", isAuth, userController.appDetail);
router.get("/userDownloadAPK/:apkFile", isAuth, userController.downloadAPK);
router.get("/developer.profile", isAuth, userController.devProfile);
router.get("/newReleases", isAuth, userController.newReleasesPage);

router.post("/add.comment/:appID", isAuth, userController.addComment);
router.post("/addToWishList/:appID", isAuth, userController.addToWishList);
module.exports = router;
