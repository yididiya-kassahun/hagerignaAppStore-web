const express = require("express");
const { check, body } = require("express-validator/check");

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
router.get(
  "/register.reviewer/:email",
  [
    body("phoneNumber", "Invalid phone number!! please try again").isLength({
      min: 9,
      max: 14,
    }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password Minimum 5 character"),
  ],
  authController.reviewerRegisterPage
);

router.post(
  "/signup.developer",
  [
    body("phoneNumber", "Invalid phone number!! please try again").isLength({
      min: 9,
      max: 14,
    }),
    body("password")
      .isLength({ min: 5 })
      .withMessage("password Minimum 5 character"),
  ],
  authController.developerSignUp
);
router.post("/signup.reviewer", authController.reviewerSignup);

router.post(
  "/signup.user",
  [
    body("userAge").custom((value, { req }) => {
      if (value < 14) {
        throw new Error("Not Allowed !! Age must be greater than 14.");
      }
      return true;
    }),
    body("userPassword")
      .isLength({ min: 5 })
      .withMessage("password Minimum 5 character"),
  ],
  authController.userSignup
);

router.post("/developersignIn", authController.developerSignIn);
router.post("/usersignIn", authController.userSignIn);
router.post("/reviewersignIn", authController.reviewerSignIn);
router.post("/adminsignIn", authController.adminSignIn);

router.post("/logout", authController.logout);

module.exports = router;
