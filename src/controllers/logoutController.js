const jwt = require("jsonwebtoken");

exports.logout = (req, res) => {
 
  res.clearCookie('jwt');
  res.json({ message: 'Logout successful' });
  
};