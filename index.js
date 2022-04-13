var express = require("express");
var session = require("express-session");
var passport = require("passport");
require("dotenv").config();

// Routes
var gitHubRoutes = require("./src/routes/githubOAuth.js");
var googleRoutes = require("./src/routes/googleOAuth.js");
var loginRoutes = require("./src/routes/loginOAuth.js");
var registerRoutes = require("./src/routes/registerOAuth.js");
var sendCryptocurrencyRoutes = require("./src/routes/sendCryptocurrency");

const mongoose = require("mongoose");
const isAuth = require("./src/middleware/isAuth.js");
const constants = require("./src/constants/values.js");
const Users = require("./src/models/users.js");

var server = express();

mongoose.connect(
  process.env.MONGO_DB_CONN_STRING,
  {
    dbName: "cryptoexchange",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (e) => {
    console.log("db connection", !e ? "successfull" : e);
  }
);

server.use(
  session({
    secret: "cryptoexchangeSecretKey",
    saveUninitialized: false,
    resave: false,
  })
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
server.use(passport.initialize());
server.use(passport.session());

server.use(googleRoutes);
server.use(gitHubRoutes);
server.use(loginRoutes);
server.use(registerRoutes);
server.use(sendCryptocurrencyRoutes);
server.get(constants.UNAUTHORIZED_URL, (req, res) => {
  res.status(401).send("Unauthorized, please login");
});
server.use("/api/users/:userId", isAuth, async (req, res) => {
  const dbUser = await Users.findOne({ userId: req.params.userId });
  if (dbUser) {
    return res.send(dbUser);
  }
  return res.redirect(constants.UNAUTHORIZED_URL);
});

console.log("server at http://localhost:1234/api/");
server.listen(1234);
