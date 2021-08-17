const express = require("express");

const reviewerController = require("../controllers/reviewerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/reviewer", reviewerController.reviewerDashboard);
router.get("/editors.choice", reviewerController.editorsChoicePage);
router.get("/reviewApp/:appID", reviewerController.reviewAppPage);
router.get("/review.policy", reviewerController.policyPage);

module.exports = router;
