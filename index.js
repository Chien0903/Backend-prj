const express = require("express");
const methodOverride = require("method-override");
const bodyParser =require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
require("dotenv").config();

const database = require("./config/database");

const systemConfig = require("./config/system");

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended:false}));
app.set("views", "./views");
app.set("view engine", "pug");

// Flash
app.use(cookieParser("ChienNe"));
app.use(session({cookie: {maxAge: 60000}}));
app.use(flash());
// End flash

// App local Variables
app.locals.prefixAdmin = systemConfig.prefixAdmin

app.use(express.static("public"));

//Routes
routeAdmin(app);
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
