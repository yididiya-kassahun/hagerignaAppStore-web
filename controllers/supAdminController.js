const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const smtpTransport = require("nodemailer-smtp-transport");
const Policy = require("../models/policy");
const appQuestionary = require("../models/questionary");
const answeredQuestionary = require("../models/answeredQuestionary");
const developer = require("../models/developer");
const reviewer = require("../models/reviewer");
const collectedEmail = require("../models/collectedEmail");
const androidAPI = require("../models/AndroidAPI");
const user = require("../models/user");
const apps = require("../models/createApp");
const reviewApps = require("../models/reviewApp");
const Sequelize = require("sequelize");
const countUserss = require("../counters/userCounter");

var moment = require("moment");

exports.adminDashboard = (req, res, next) => {
  // const totalUsers = ;
  // const totalDevelopers = exports.coutDevelopers();
  // const totalReviewers = exports.coutReviewers();

  androidAPI
    .findAll()
    .then((result) => {
      user
        .count()
        .then((totalUsers) => {
          developer
            .count()
            .then((totalDevelopers) => {
              reviewer
                .count()
                .then((totalReviewers) => {
                  apps
                    .count()
                    .then((totalapps) => {
                      if (
                        totalUsers &&
                        totalDevelopers &&
                        totalReviewers &&
                        totalapps
                      ) {
                        res.render("SupAdmin/supAdminDashboard", {
                          androidAPIs: result,
                          pageTitle: "main Dashboard",
                          totalUsers: totalUsers,
                          totalDevelopers: totalDevelopers,
                          totalReviewers: totalReviewers,
                          totalApps: totalapps,
                          path: "dashboard",
                        });
                      } else {
                        res.render("SupAdmin/supAdminDashboard", {
                          androidAPIs: result,
                          pageTitle: "main Dashboard",
                          totalUsers: 0,
                          totalDevelopers: 0,
                          totalReviewers: 0,
                          totalApps: 0,
                          path: "dashboard",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.developersListPage = (req, res, next) => {
  developer
    .findAll()
    .then((developerLists) => {
      user
        .count()
        .then((totalUsers) => {
          developer
            .count()
            .then((totalDevelopers) => {
              reviewer
                .count()
                .then((totalReviewers) => {
                  apps
                    .count()
                    .then((totalapps) => {
                      if (
                        totalUsers &&
                        totalDevelopers &&
                        totalReviewers &&
                        totalapps
                      ) {
                        res.render("SupAdmin/developers", {
                          developers: developerLists,
                          pageTitle: "main Dashboard",
                          totalUsers: totalUsers,
                          totalDevelopers: totalDevelopers,
                          totalReviewers: totalReviewers,
                          totalApps: totalapps,
                          path: "dashboard",
                        });
                      } else {
                        res.render("SupAdmin/developers", {
                          developers: developerLists,
                          pageTitle: "main Dashboard",
                          totalUsers: 0,
                          totalDevelopers: 0,
                          totalReviewers: 0,
                          totalApps: 0,
                          path: "dashboard",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
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
      collectedEmail
        .findAll()
        .then((emails) => {
          user
            .count()
            .then((totalUsers) => {
              developer
                .count()
                .then((totalDevelopers) => {
                  reviewer
                    .count()
                    .then((totalReviewers) => {
                      apps
                        .count()
                        .then((totalapps) => {
                          if (
                            totalUsers &&
                            totalDevelopers &&
                            totalReviewers &&
                            totalapps
                          ) {
                            res.render("SupAdmin/reviewers", {
                              reviewers: reviewerList,
                              emails: emails,
                              pageTitle: "main Dashboard",
                              totalUsers: totalUsers,
                              totalDevelopers: totalDevelopers,
                              totalReviewers: totalReviewers,
                              totalApps: totalapps,
                              path: "dashboard",
                            });
                          } else {
                            res.render("SupAdmin/reviewers", {
                              reviewers: reviewerList,
                              emails: emails,
                              pageTitle: "main Dashboard",
                              totalUsers: 0,
                              totalDevelopers: 0,
                              totalReviewers: 0,
                              totalApps: 0,
                              path: "dashboard",
                            });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
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
      user
        .count()
        .then((totalUsers) => {
          developer
            .count()
            .then((totalDevelopers) => {
              reviewer
                .count()
                .then((totalReviewers) => {
                  apps
                    .count()
                    .then((totalapps) => {
                      if (
                        totalUsers &&
                        totalDevelopers &&
                        totalReviewers &&
                        totalapps
                      ) {
                        res.render("SupAdmin/usersListPage", {
                          users: userList,
                          pageTitle: "main Dashboard",
                          totalUsers: totalUsers,
                          totalDevelopers: totalDevelopers,
                          totalReviewers: totalReviewers,
                          totalApps: totalapps,
                          path: "dashboard",
                        });
                      } else {
                        res.render("SupAdmin/usersListPage", {
                          users: userList,
                          pageTitle: "main Dashboard",
                          totalUsers: 0,
                          totalDevelopers: 0,
                          totalReviewers: 0,
                          totalApps: 0,
                          path: "dashboard",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPolicies = (req, res, next) => {
  const Title = req.body.title;
  const Content = req.body.content;

  Policy.create({
    policyTitle: Title,
    policyContent: Content,
    adminID: req.session.admin.id,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/admin.policy");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.policyPage = (req, res, next) => {
  Policy.findAll()
    .then((policies) => {
      user
        .count()
        .then((totalUsers) => {
          developer
            .count()
            .then((totalDevelopers) => {
              reviewer
                .count()
                .then((totalReviewers) => {
                  apps
                    .count()
                    .then((totalapps) => {
                      if (
                        totalUsers &&
                        totalDevelopers &&
                        totalReviewers &&
                        totalapps
                      ) {
                        res.render("SupAdmin/policyPage", {
                          policyList: policies,
                          pageTitle: "main Dashboard",
                          totalUsers: totalUsers,
                          totalDevelopers: totalDevelopers,
                          totalReviewers: totalReviewers,
                          totalApps: totalapps,
                          path: "dashboard",
                        });
                      } else {
                        res.render("SupAdmin/policyPage", {
                          policyList: policies,
                          pageTitle: "main Dashboard",
                          totalUsers: 0,
                          totalDevelopers: 0,
                          totalReviewers: 0,
                          totalApps: 0,
                          path: "dashboard",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.deletePolicy = (req, res, next) => {
  const policyID = req.params.policyID;
  Policy.findByPk(policyID)
    .then((policy) => {
      policy.destroy();
    })
    .then((result) => {
      console.log("Policy Deleted Successfully!");
      res.redirect("/admin.policy");
    })
    .catch((err) => {
      console.log(err);
    });
  console.log(policyID);
};
exports.questionaryPage = (req, res, next) => {
  appQuestionary
    .findAll()
    .then((questionary) => {
      user
        .count()
        .then((totalUsers) => {
          developer
            .count()
            .then((totalDevelopers) => {
              reviewer
                .count()
                .then((totalReviewers) => {
                  apps
                    .count()
                    .then((totalapps) => {
                      if (
                        totalUsers &&
                        totalDevelopers &&
                        totalReviewers &&
                        totalapps
                      ) {
                        res.render("SupAdmin/addQuestionary", {
                          questionaries: questionary,
                          pageTitle: "main Dashboard",
                          totalUsers: totalUsers,
                          totalDevelopers: totalDevelopers,
                          totalReviewers: totalReviewers,
                          totalApps: totalapps,
                          path: "dashboard",
                        });
                      } else {
                        res.render("SupAdmin/addQuestionary", {
                          questionaries: questionary,
                          pageTitle: "main Dashboard",
                          totalUsers: 0,
                          totalDevelopers: 0,
                          totalReviewers: 0,
                          totalApps: 0,
                          path: "dashboard",
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
};
exports.addQuestionary = (req, res, next) => {
  const questionary = req.body.questionary;

  appQuestionary
    .create({
      question: questionary,
      adminID: req.session.admin.id,
    })
    .then((result) => {
      console.log(result.question);
      res.redirect("/admin.questionary");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteQuestionary = (req, res, next) => {
  const questionID = req.params.questionID;
  appQuestionary
    .findByPk(questionID)
    .then((questionary) => {
      questionary.destroy();
    })
    .then((result) => {
      console.log("Questionary Deleted Successfully!");
      res.redirect("/admin.questionary");
    })
    .catch((err) => {
      console.log(err);
    });
};
// exports.sendRegistrationEmail = (req, res, next) => {
//   const reviewerEmail = req.body.reviewerEmail;

//   collectedEmail
//     .create({
//       email: reviewerEmail,
//       status: "sent",
//       adminID: req.session.admin.id,
//     })
//     .then((result) => {
//       console.log(result);
//       res.redirect("/reviewerList");
//       return transporter.sendMail({
//         to: result.email,
//         from: "yidu.kassahun.me@gmail.com",
//         subject: "Hagerigna AppStore",
//         html:
//           "<h1>Registration Link : http://localhost:3000/register.reviewer/" +
//           result.email +
//           "</h1>",
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };

exports.sendRegistrationEmail = (req, res, next) => {
  const reviewerEmail = req.body.reviewerEmail;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    host: "smtp.gmail.com",
    auth: {
      user: "yidu.kassahun.me@gmail.com",
      pass: "37732850.pwd",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  collectedEmail
    .create({
      email: reviewerEmail,
      status: "sent",
      adminID: req.session.admin.id,
    })
    .then((result) => {
      console.log(result);
      var mailOptions = {
        from: "yidu.kassahun.me@gmail.com",
        to: "yididiya127@gmail.com",
        subject: "ሀገርኛ Appstore Registration Email",
        text:
          "Registration Link : http://localhost:3000/register.reviewer/" +
          result.email,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
        res.redirect("/reviewerList");
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteEmail = (req, res, next) => {
  const emailID = req.params.emailID;

  collectedEmail
    .findByPk(emailID)
    .then((fetchedEmail) => {
      fetchedEmail.destroy();
      console.log("email deleted Successfully");
      res.redirect("/reviewerList");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addAndroidAPI = (req, res, next) => {
  const codeName = req.body.codeName;
  const version = req.body.version;
  const apiLevel = req.body.apiLevel;

  androidAPI
    .create({
      codeName: codeName,
      version: version,
      API_Level: apiLevel,
      adminID: req.session.admin.id,
    })
    .then((result) => {
      console.log("Android API Successfully added");
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteAndroidAPI = (req, res, next) => {
  const apiID = req.params.androidID;

  androidAPI
    .findByPk(apiID)
    .then((fetchedAPI) => {
      fetchedAPI.destroy();
      console.log("Android API deleted Successfully");
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.assignRoleToReviewer = (req, res, next) => {
  const reviewerID = req.params.reviewerID;
  const checkRole = req.body.roleCheckbox;

  if (checkRole == "on") {
    reviewer
      .findOne({ where: { id: reviewerID } })
      .then((reviewer) => {
        if (reviewer) {
          reviewer.isPermit = true;
          reviewer.save();
          res.redirect("/reviewerList");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
  }
};

exports.approvedApps = (req, res, next) => {
  reviewApps
    .count({
      attributes: ["createdAt"],
      group: "createdAt",
      where: { approved: true },
    })
    .then((approvedapp) => {
      // console.log(approvedapp[0].createdAt);
      res.json({
        approvedapps: approvedapp,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.disapprovedApps = (req, res, next) => {
  reviewApps
    .count({
      attributes: ["createdAt"],
      group: "createdAt",
      where: { disapproved: true, approved: false },
    })
    .then((disapprovedapp) => {
      console.log(disapprovedapp[0].createdAt);
      res.json({
        disapprovedapps: disapprovedapp,
        moment: moment,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.countUsers = function coutUsers() {
  const count = user
    .count()
    .then((users) => {
      console.log(users);
    })
    .catch((err) => {
      console.log(err);
    });
  return count;
};

exports.coutDevelopers = (req, res, next) => {
  return developer
    .count()
    .then((developers) => {
      console.log(developers);
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.coutReviewers = (req, res, next) => {
  return reviewer
    .count()
    .then((reviewer) => {
      console.log(reviewer);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.userAccount = (req, res, next) => {
  const userID = req.params.userID;
  const accountStatus = req.query.deactivated;

  user
    .findOne({ where: { id: userID } })
    .then((userData) => {
      console.log("------------------" + userData.isDeactivated);
      if (userData.isDeactivated) {
        userData.isDeactivated = false;
        userData.save();
        res.redirect("/ordinaryUsers");
      } else {
        userData.isDeactivated = true;
        userData.save();
        res.redirect("/ordinaryUsers");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.developerAccount = (req, res, next) => {
  const developerID = req.params.developerID;

  developer
    .findOne({ where: { id: developerID } })
    .then((devData) => {
      if (devData.isDeactivated) {
        devData.isDeactivated = false;
        devData.save();
        res.redirect("/developerList");
      } else {
        devData.isDeactivated = true;
        devData.save();
        res.redirect("/developerList");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.reviewerAccount = (req, res, next) => {
  const reviewerID = req.params.reviewerID;
  const accountStatus = req.query.deactivated;

  reviewer
    .findOne({ where: { id: reviewerID } })
    .then((revData) => {
      if (revData.isDeactivated) {
        revData.isDeactivated = false;
        revData.save();
        res.redirect("/reviewerList");
      } else {
        revData.isDeactivated = true;
        revData.save();
        res.redirect("/reviewerList");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
