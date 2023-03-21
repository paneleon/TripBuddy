const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const config = require('dotenv').config();

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
  const authHeader = req.get('Authorization')
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

const auth = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;