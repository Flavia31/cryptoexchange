const express = require("express");
const passport = require("passport")
const LocalStrategy = require('passport-local')
const Users = require("../models/users.js");
const bcrypt = require('bcrypt');
const encrypt = require("../services/encryptPassword");

const server = express();

server.use(express.json());

passport.use(
  new LocalStrategy(
    async (username, password, done) => {

      const user = await Users.findOne({ username });
      if (!user) {
        return done(null, false, { message: "401: User not found.\n" });
      } else {

        let validPassword;
        await encrypt.comparePassword(password, user.password).then((res) => {
          validPassword = res
        });

        if (!validPassword) {
          return done(null, false, { message: "Incorrect password!\n" });
        } else {
          if (user.provider === "register") {
            await Users.updateOne(user, { lastLogin: new Date() });
            return done(null, user);
          }
        }
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser( (obj, done) => {
  done(null, obj)
})

server.post("/auth/login", passport.authenticate('local', {
   failureMessage: true
}),
  (req, res) => {
    res.redirect(`/api/users/${req.session.passport.user.id}`)
  })

module.exports = server;
