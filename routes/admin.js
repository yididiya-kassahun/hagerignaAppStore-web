const express = require("express");

const supAdminController = require("../controllers/supAdminController");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/admin", isAuth, supAdminController.adminDashboard);
router.get("/reviewerList", isAuth, supAdminController.reviewerList);
router.get("/developersList", isAuth, supAdminController.developersListPage);
router.get("/ordinaryUsers", isAuth, supAdminController.ordinaryUsersPage);
router.get("/admin.policy", isAuth, supAdminController.policyPage);
router.get("/admin.questionary", isAuth, supAdminController.questionaryPage);

router.get("/approvedAppStat", isAuth, supAdminController.approvedApps);
router.get("/disapprovedAppStat", isAuth, supAdminController.disapprovedApps);

router.post("/admin.addPolicy", isAuth, supAdminController.addPolicies);
router.post("/deletePolicy/:policyID", isAuth, supAdminController.deletePolicy);
router.post(
  "/deleteQuestions/:questionID",
  supAdminController.deleteQuestionary
);
router.post("/deleteEmail/:emailID", isAuth, supAdminController.deleteEmail);
router.post("/admin.addQuestionary", isAuth, supAdminController.addQuestionary);
router.post("/admin.addAndroidAPI", isAuth, supAdminController.addAndroidAPI);
router.post(
  "/deleteAndroidAPI/:androidID",
  isAuth,
  supAdminController.deleteAndroidAPI
);
router.post("/send.email", isAuth, supAdminController.sendRegistrationEmail);
router.post(
  "/assignRole/:reviewerID",
  isAuth,
  supAdminController.assignRoleToReviewer
);

router.post("/userAccount/:userID", isAuth, supAdminController.userAccount);
router.post(
  "/developerAccount/:developerID",
  isAuth,
  supAdminController.developerAccount
);
router.post(
  "/reviewerAccount/:reviewerID",
  isAuth,
  supAdminController.reviewerAccount
);

module.exports = router;
