const express = require("express");

const supAdminController = require("../controllers/supAdminController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/admin", supAdminController.adminDashboard);
router.get("/reviewerList", supAdminController.reviewerList);
router.get("/developersList", supAdminController.developersListPage);
router.get("/ordinaryUsers", supAdminController.ordinaryUsersPage);
router.get("/admin.policy", supAdminController.policyPage);
module.exports = router;
