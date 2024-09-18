const jwt = require("jsonwebtoken");
require("dotenv").config();

const GenerateToken = (user) => {
  // Ensure id is properly wrapped in an object
 
  return jwt.sign({ id: user._id }, process.env.jwts, { expiresIn: '24h' });
};

module.exports = GenerateToken;
