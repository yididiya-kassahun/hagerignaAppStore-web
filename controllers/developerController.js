const getPolicy = require("../models/addPolicy");

exports.developerDashboard = (req, res, next) => {
  res.render("Developer/devDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};
exports.createAppPage = (req, res, next) => {
  res.render("Developer/createApp", {
    pageTitle: "Create App Page",
    path: "dashboard",
  });
};
exports.storeListing = (req, res, next) => {
   res.render("Developer/storeList", {
     pageTitle: "main store listing Page",
     path: "dashboard",
   });
};
exports.appQuestionary = (req, res, next) => {
  res.render("Developer/questionaries", {
    pageTitle: "Questionaries",
    path:'dashboard'
  });
};
exports.devPolicy = (req, res, next) => {
 
    getPolicy
      .findAll()
      .then((policies) => {
        res.render("Developer/policies", {
          policyList: policies,
          pageTitle: "Get Policy Page",
        });
      })
      .catch((err) => {
        console.log(err);
      });
};
exports.reportPage = (req, res, next) => {
  res.render("Developer/generalReport", {
    pageTitle: "Policy Page",
    path: "dashboard",
  });
};
