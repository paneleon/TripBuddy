const passport = require('passport');
const Utils = require('../utils/index.js');
const User = require('../models/user.model')

exports.processLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    // are there any server errors?
    if (err) {
      console.error(err);
      res.end(err);
    }
    // are there any login errors?
    if (!user) {
      return res.json({ success: false, msg: "ERROR: Authentication Failed" });
    }

    // no problems -  we have a good username and password
    req.logIn(user, (err) => {
      // are there any db errors?
      if (err) {
        console.error(err);
        res.end(err);
      }

      const authToken = Utils.GenerateToken(user);
      return res.json({
        success: true,
        msg: "User Logged In Successfully",
        user: {
          id: user._id,
          displayName: user.firstName,
          username: user.username,
          emailAddress: user.email,
        },
        token: authToken,
      });
    });
  })(req, res, next);
}

exports.processRegistration = (req, res, next) => {
  //Instantiate a new user object
  let newUser = new User({
    ...req.body, //Javascript destructing
  });

  User.register(newUser, req.body.password, (err) => {
    // error validations
    if (err) {
      if (err.name === "UserExistsError") {
        console.error("ERROR: User Already Exists!");
      }

      console.log(err);

      return res.json({ success: false, msg: "ERROR: Registration Failed!" });
    }

    // all ok - user has been registered
    return res.json({ success: true, msg: "User Registered Successfully" });
  });
}

exports.processLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    console.log("User Logged Out");
  });

  res.json({ success: true, msg: "User logged out successfully" });
}
