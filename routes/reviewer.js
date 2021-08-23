const express = require("express");

const reviewerController = require("../controllers/reviewerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/reviewer", reviewerController.reviewerDashboard);
router.get("/editors.choice", reviewerController.editorsChoicePage);
router.get("/reviewApp/:appID", reviewerController.reviewAppPage);
router.get("/review.policy", reviewerController.policyPage);
router.get("/publicCart", reviewerController.publicAppCart);
router.get("/downloadAPK/:apkFile", reviewerController.downloadAPKFile);
router.get("/approvedApps", reviewerController.approvedApps);


router.post("/addToCart/:reviewAppID", reviewerController.addToCart);
router.post("/approvedReviewResult", reviewerController.approvedReviewResult);
router.post(
  "/disapprovedReviewResult",
  reviewerController.disapprovedReviewResult
);

module.exports = router;
