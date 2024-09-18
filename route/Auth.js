const express = require("express");
const  router = express.Router();
const Auth = require("../Controller/Auth");
console.log(Auth);
router.post("/signin",Auth.login);
router.post("/otpverify",Auth.Verify);

module.exports  = router;