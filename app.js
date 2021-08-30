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
const reviewer = require("./models/reviewer");
const admin = require("./models/admin");

const errorController = require("./controllers/errorController");

//------| routes
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const devRoute = require("./routes/developer");
const reveiwerRoute = require("./routes/reviewer");
const authRoute = require("./routes/auth");
const user = require("./models/user");
const appComment = require("./models/appComment");

const app = express();
const store = new MysqlStore({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "hagerignaDB",
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

// createApp.belongsTo(developer, { primarykey: "id" });
// storeListing.belongsTo(developer, { primarykey: "id" });
// apkFileDetail.belongsTo(developer, { primarykey: "id" });

developer.hasMany(createApp, { foreignKey: "developerID" });
developer.hasMany(storeListing, { foreignKey: "developerID" });
developer.hasMany(apkFileDetail, { foreignKey: "developerID" });

reviewer.hasMany(reviewApp, { foreignKey: "reviewerID" });

admin.hasMany(policy, { foreignKey: "adminID" });
admin.hasMany(questionary, { foreignKey: "adminID" });

app.use(errorController.get404);

// user.hasMany(appComment,{foreignKey:"userID"})
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
