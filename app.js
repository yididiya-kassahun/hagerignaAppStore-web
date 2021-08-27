const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
//const expressHbs = require("express-handlebars");
const session = require("express-session");
const MysqlStore = require("express-mysql-session")(session);
const sequelize = require("./utils/database");
const multer = require("multer");
const fileUpload = require("express-fileupload");
// -----| models
const adminModel = require("./models/admin");
const addPolicy = require("./models/addPolicy");
const addQuestionary = require("./models/addQuestionary");
const answeredQuestionary = require("./models/answeredQuestionary");
const registerDeveloper = require("./models/developer");
const registerReviewer = require("./models/reviewer");
const createApp = require("./models/createApp");
const storeListing = require("./models/appStorelist");
const apkFileDetail = require("./models/apkDetail");
const defaultLanguage = require("./models/defaultLanguage");
const collectedEmail = require("./models/collectedEmail");
const androidAPI = require("./models/AndroidAPI");
const roles = require("./models/roles");
const appComments = require("./models/appComment");

//------| routes
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const devRoute = require("./routes/developer");
const reveiwerRoute = require("./routes/reviewer");
const authRoute = require("./routes/auth");

const app = express();
const store = new MysqlStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "hagerignaDB",
});

// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   }, // add developer ID for Uniqueness of uploaded image
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).array(
//     "uploadedImage",
//     3
//   )
// );

// Setup View template engine
app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
// join stylesheet with system root path

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "public/img")));
app.use(express.static(path.join(__dirname, "public/uploads/")));

app.use(fileUpload());

app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

//-----| Set Routing
app.use(adminRoute);
app.use(userRoute);
app.use(devRoute);
app.use(reveiwerRoute);
app.use(authRoute);

//storeListing.belongsTo(createApp, { primarykey: "appID" });

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
