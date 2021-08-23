const express = require("express");
const isAuth = require("../middleware/isAuth");

const reviewerController = require("../controllers/reviewerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/reviewer", isAuth,reviewerController.reviewerDashboard);
router.get("/editors.choice", isAuth, reviewerController.editorsChoicePage);
router.get("/reviewApp/:appID", isAuth, reviewerController.reviewAppPage);
router.get("/review.policy", isAuth, reviewerController.policyPage);
router.get("/publicCart", isAuth, reviewerController.publicAppCart);
router.get("/downloadAPK/:apkFile", isAuth, reviewerController.downloadAPKFile);
router.get("/approvedApps", isAuth, reviewerController.approvedApps);


router.post("/addToCart/:reviewAppID", isAuth, reviewerController.addToCart);
router.post(
  "/approvedReviewResult",
  isAuth,
  reviewerController.approvedReviewResult
);
router.post(
  "/disapprovedReviewResult",
  isAuth,
  reviewerController.disapprovedReviewResult
);

module.exports = router;
