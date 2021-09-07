const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const sequelize = require("./utils/database");
const fileUpload = require("express-fileupload");
const toastr = require("express-toastr");
const cookieParser = require("cookie-parser");
let ejs = require("ejs");
let pdf = require("html-pdf");
// const pdf = require("express-pdf");
//const multer = require("multer");

// -----| models
const adminModel = require("./models/admin");
const policy = require("./models/policy");
const questionary = require("./models/questionary");
const answeredQuestionary = require("./models/answeredQuestionary");
const developer = require("./models/developer");
const createApp = require("./models/createApp");
const storeListing = require("./models/appStorelist");
const apkFileDetail = require("./models/apkDetail");
const reviewApp = require("./models/reviewApp");
const defaultLanguage = require("./models/defaultLanguage");
const collectedEmail = require("./models/collectedEmail");
const androidAPI = require("./models/AndroidAPI");
const roles = require("./models/roles");
const appComments = require("./models/appComment");
const appWishList = require("./models/appWishList");
const reviewer = require("./models/reviewer");
const admin = require("./models/admin");

const flash = require("connect-flash");

const errorController = require("./controllers/errorController");

//------| routes
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const devRoute = require("./routes/developer");
const reveiwerRoute = require("./routes/reviewer");
const authRoute = require("./routes/auth");
const user = require("./models/user");
const appDownload = require("./models/appDownload");
const appComment = require("./models/appComment");
const storeList = require("./models/appStorelist");

const app = express();
const store = new MysqlStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "hagerignaDB",
});

app.use(cookieParser("secret"));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
      // Session expires after 24 hours of inactivity.
      expires: 86400000,
    },
  })
);

app.use(flash());
app.use(toastr());

app.use(function (req, res, next) {
  res.locals.toasts = req.toastr.render();
  next();
});

// Setup View template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// join stylesheet with system root path

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/img")));
app.use(express.static(path.join(__dirname, "public/uploads/")));

app.use(fileUpload());

//-----| Set Routing
app.use(adminRoute);
app.use(userRoute);
app.use(devRoute);
app.use(reveiwerRoute);
app.use(authRoute);

developer.hasMany(createApp, { foreignKey: "developerID" });
developer.hasMany(storeListing, { foreignKey: "developerID" });
developer.hasMany(apkFileDetail, { foreignKey: "developerID" });
developer.hasMany(apkFileDetail, { foreignKey: "developerID" });

createApp.belongsTo(developer);
storeListing.belongsTo(developer);
apkFileDetail.belongsTo(developer);

createApp.hasOne(reviewApp, { foreignKey: "appID" });
createApp.hasOne(appWishList, { foreignKey: "appID" });

user.hasMany(appWishList, { foreignKey: "userID" });
appWishList.belongsTo(user);
user.hasMany(appDownload, { foreignKey: "userID" });
appDownload.belongsTo(user);

app.use(errorController.get404);

// Using sequelizer for ORM database - mysql
sequelize
  //.sync({ force: true }) //override the existing table
  .sync()
  .then((result) => {
    app.listen(3000);
    //  return User;
  })
  .catch((err) => {
    console.log(err);
  });
//app.listen(3000);
