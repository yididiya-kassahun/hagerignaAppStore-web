const express = require("express");

const developerController = require("../controllers/developerController");
//const isAuth = require("../middleware/is-Auth");

const router = express.Router();

router.get("/developer", developerController.developerDashboard);
router.get("/report", developerController.reportPage);
router.get("/policies", developerController.devPolicy);
router.get("/create.app", developerController.createAppPage);
router.get("/store.listing", developerController.storeListing);
router.get("/app.questionary", developerController.appQuestionary);
module.exports = router;
