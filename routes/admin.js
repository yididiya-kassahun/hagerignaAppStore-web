const express = require("express");

const supAdminController = require("../controllers/supAdminController");

//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/admin", supAdminController.adminDashboard);
router.get("/reviewerList", supAdminController.reviewerList);
router.get("/developersList", supAdminController.developersListPage);
router.get("/ordinaryUsers", supAdminController.ordinaryUsersPage);
router.get("/admin.policy", supAdminController.policyPage);
router.get("/admin.questionary", supAdminController.questionaryPage);

router.post("/admin.addPolicy", supAdminController.addPolicies);
router.post("/deletePolicy/:policyID", supAdminController.deletePolicy);
router.post("/deleteQuestions/:questionID", supAdminController.deleteQuestionary);
router.post("/deleteEmail/:emailID",supAdminController.deleteEmail);
router.post("/admin.addQuestionary", supAdminController.addQuestionary);
router.post("/admin.addAndroidAPI", supAdminController.addAndroidAPI);
router.post("/send.email", supAdminController.sendRegistrationEmail);
router.post("/assignRole/:reviewerID", supAdminController.assignRoleToReviewer);

module.exports = router;
