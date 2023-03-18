const UserDisplayName = require('../utils/auth.js');
const UserSchema = require('../models/user.js');
const UserId = require('../utils/auth.js');

exports.DisplayProfilePage = (req, res, next) => {
  let id = req.params.id;
  res.render("index", {
    title: "Profile",
    page: "profile",
    displayName: UserDisplayName(req),
  });
}

exports.ProcessProfileChangePage = (req, res, next) => {
  let id = UserId(req).toString();

  let newProfile = UserSchema({
    _id: id,
    emailAddress: req.body.email,
    username: req.body.username,
    displayName: req.body.first_name + " " + req.body.last_name,
  });

  console.log(req.body.username + " username");
  UserSchema.updateOne({ _id: id }, newProfile, (err, User) => {
    if (err) {
      console.error(err);
      res.end(err);
    }

    res.redirect("/profile");
  });
}
