const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

exports.UserDisplayName = (req, res) => {
  if (req.user) {
    return req.user.displayName;
  }
  return "";
}
exports.UserId = (req) => {
  if (req.user) {
    return req.user._id;
  }
  return "";
}

exports.AuthGuard = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

exports.GenerateToken = (user) => {
  const payload = {
    id: user._id,
    displayName: user.displayName,
    userName: user.userName,
    emailAddress: user.emailAddress,
  };

  const jwtOptions = {
    expiresIn: 60004800, //1 Week
  };

  return jwt.sign(payload, secret, jwtOptions);
}
