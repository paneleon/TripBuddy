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
    return res.status(403).json({ error: 'Token is not provided' });
  }
  const token = authHeader.split(' ')[1]
  
  console.log("token", token)
  try {
    jwt.verify(token, secret)
  } catch (error){
    return res.status(401).json({ error: 'Token is invalid' });
  }
  return next();
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MTRiNTdkYzA2YjQ1MDhmNmJhNzUxMiIsImlhdCI6MTY3OTE1ODY0NywiZXhwIjoxNzM5MTYzNDQ3fQ.7DFhwvUqpo7dDc9DS_R1oLuNaK4ED_dn9t28DUPUcVo

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