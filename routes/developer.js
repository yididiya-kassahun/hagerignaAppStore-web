const express = require("express");

const developerController = require("../controllers/developerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/developer", developerController.developerDashboard);
router.get("/create.app", developerController.createAppPage);
router.get("/report", developerController.reportPage);
router.get("/policies", developerController.devPolicy);
module.exports = router;
