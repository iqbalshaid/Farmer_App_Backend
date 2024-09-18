const express = require("express");
const router = express.Router();
const upload = require("../Middleware/Multer.js");
const AuthMiddle = require("../Middleware/AuthMiddle.js");
console.log(AuthMiddle,"AuthM");

const Profile = require("../Controller/Profile.js")
console.log(Profile,"profile");
router.post("/postprofile",AuthMiddle.AuthVerify,upload.array("image",10),Profile.Profiles);
router.get("/getProfile",AuthMiddle.AuthVerify,Profile.getProfiles);
router.put("/updateProfile/:id",AuthMiddle.AuthVerify,upload.array("image",10),Profile.UpdateProfiles);
router.get("/getParticular/:id",AuthMiddle.AuthVerify,Profile.getParticular);

module.exports = router;