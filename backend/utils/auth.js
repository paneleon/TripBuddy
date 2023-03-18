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

exports.isAuthenticated = (req, res, next) => {
  const authHeader = req.get('authorization')
  if (!authHeader){
    return res.status(403).json({ success: false, message: 'Token is not provided' });
  }
  const token = authHeader.split(' ')[1]
  try {
    jwt.verify(token, secret)
  } catch (error){
    return res.status(401).json({ success: false, message: 'Token is invalid' });
  }
  return next();
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