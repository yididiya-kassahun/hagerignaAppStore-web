const express = require("express");

const authController = require("../controllers/authController");

const router = express.Router();

router.get("/login", authController.loginPage);
router.get("/register.user", authController.userRegisterPage);
router.get("/register.developer", authController.developerRegisterPage);
router.get("/register.Reviewer", authController.reviewerRegisterPage);

module.exports = router;
