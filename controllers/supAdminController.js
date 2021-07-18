const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const addPolicy = require("../models/addPolicy");
const appQuestionary = require("../models/addQuestionary");
const getDevelopers = require("../models/register-developer");
const reviewer = require("../models/register-reviewer");
const user = require("../models/register-user");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: "",
    },
  })
);
exports.adminDashboard = (req, res, next) => {
  res.render("SupAdmin/supAdminDashboard", {
    pageTitle: "main Dashboard",
    path: "dashboard",
  });
};

exports.developersListPage = (req, res, next) => {
  getDevelopers
    .findAll()
    .then((developerLists) => {
      res.render("SupAdmin/developers", {
        developers: developerLists,
        pageTitle: "DEvelopers Dashboard",
        path: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.reviewerList = (req, res, next) => {
  reviewer
    .findAll()
    .then((reviewerList) => {
      res.render("SupAdmin/reviewers", {
        reviewers: reviewerList,
        pageTitle: "Reviewer Dashboard",
        path: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.ordinaryUsersPage = (req, res, next) => {
  user
    .findAll()
    .then((userList) => {
      res.render("SupAdmin/usersListPage", {
        users: userList,
        pageTitle: "User Dashboard",
        path: "dashboard",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// exports.policyPage = (req, res, next) => {
//   res.render("SupAdmin/policyPage", {
//     pageTitle: "Policy & Regulation page",
//     path: "dashboard",
//   });
// };

exports.addPolicies = (req, res, next) => {
  const Title = req.body.title;
  const Content = req.body.content;

  addPolicy
    .create({
      policyTitle: Title,
      policyContent: Content,
      adminID: 1,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.policyPage = (req, res, next) => {
  addPolicy
    .findAll()
    .then((policies) => {
      res.render("SupAdmin/policyPage", {
        policyList: policies,
        pageTitle: "Add Policy Page",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.questionaryPage = (req, res, next) => {
  appQuestionary
    .findAll()
    .then((questionary) => {
      res.render("SupAdmin/addQuestionary", {
        pageTitle: "main Dashboard",
        questionaries: questionary,
        path: "dashboard",
      });
    })
    .catch((err) => console.log(err));
};
exports.addQuestionary = (req, res, next) => {
  const questionary = req.body.questionary;

  appQuestionary
    .create({
      question: questionary,
      adminID: 1,
    })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.sendRegistrationEmail = (req, res, next) => {
  const reviewerEmail = req.body.reviewerEmail;
  res.redirect("/reviewerList");
  return transporter.sendMail({
    to: reviewerEmail,
    from: "yidu.kassahun.me@gmail.com",
    subject: "Hagerigna AppStore",
    html: "<h1>Registration Link : http://localhost:3000/register.reviewer </h1>",
  });
};

exports.coutUsers = (req, res, next) => {};
exports.coutDevelopers = (req, res, next) => {};
exports.coutReviewers = (req, res, next) => {};
