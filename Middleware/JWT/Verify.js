const AppErr = require("../Error")
require("dotenv").config();
const jwt = require("jsonwebtoken");

const VerifyToken = (token) => {
  
  
  return jwt.verify(token, process.env.jwts, (err, decoded) => {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};

module.exports = VerifyToken;