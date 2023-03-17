const passport = require('passport');
const User = require('../models/user.model.js');
const UserDisplayName = require('../utils/index.js');

// Display Functions
exports.DisplayLoginPage = (req, res, next) => {
  if (!req.user) {
    return res.render("index", {
      title: "Login",
      page: "login",
      messages: req.flash("loginMessage"),
      displayName: UserDisplayName(req),
    });
  }

  return res.redirect("/home");
}

exports.DisplayRegisterPage = (req, res, next) => {
  if (!req.user) {
    return res.render("index", {
      title: "Register",
      page: "register",
      messages: req.flash("registerMessage"),
      displayName: UserDisplayName(req),
    });
  }

  return res.redirect("/home");
}

// Processing Function
exports.ProcessLoginPage = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.error(err);
      res.end(err);
    }

    if (!user) {
      req.flash("loginMessage", "Authentication Error");
      return res.redirect("/login");
    }

    req.logIn(user, function (err) {
      if (err) {
        console.error(err);
        res.end(err);
      }

      return res.redirect("/");
    });
  })(req, res, next);
}

exports.ProcessRegisterPage = (req, res, next) => {
  let newUser = new User({
    username: req.body.username,
    emailAddress: req.body.emailAddress,
    displayName: req.body.firstName + " " + req.body.lastName,
  });

  User.register(newUser, req.body.password, function (err) {
    if (err) {
      if (err.name == "UserExistsError") {
        console.error("ERROR: User Already Exists!");
        req.flash("registerMessage", "Registration Error");
      } else {
        console.error(err.name);
        req.flash("registerMessage", "Server Error");
      }

      return res.redirect("/register");
    }

    return passport.authenticate("local")(req, res, function () {
      return res.redirect("/");
    });
  });
}

exports.ProcessLogoutPage = (req, res, next) => {
  req.logOut(function (err) {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log("user logged out successfully");
  });

  res.redirect("/login");
}
