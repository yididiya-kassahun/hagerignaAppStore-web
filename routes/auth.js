const express = require("express");
const { check } = require("express-validator/check");

const authController = require("../controllers/authController");

const router = express.Router();

// >>>>>>>>>>>> -| SignIn |- <<<<<<<<<<<<<<<<<<<

router.get("/login", authController.loginPage);
router.get("/login.developer", authController.developerloginPage);
router.get("/login.reviewer", authController.reviewerloginPage);
router.get("/login.admin", authController.adminloginPage);

// >>>>>>>>>>>> -| Recover Password |- <<<<<<<<<<<<<<<<<<<

router.get("/forgottenPass", authController.forgottenPassword);
router.post("/resetPassword", authController.resetPassword);

// >>>>>>>>>>>> -| SignUp |- <<<<<<<<<<<<<<<<<<<

router.get("/register.user", authController.userRegisterPage);
router.get("/register.developer", authController.developerRegisterPage);
router.get("/register.reviewer/:email", authController.reviewerRegisterPage);

router.post("/signup.developer", authController.developerSignUp);
router.post("/signup.reviewer", authController.reviewerSignup);
router.post("/signup.user", authController.userSignup);
router.post("/developersignIn", authController.developerSignIn);
router.post("/usersignIn", authController.userSignIn);
router.post("/reviewersignIn", authController.reviewerSignIn);
router.post("/adminsignIn", authController.adminSignIn);

router.post("/logout", authController.logout);

module.exports = router;
