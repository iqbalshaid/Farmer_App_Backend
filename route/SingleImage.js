const express = require("express");
const router = express.Router();
const upload = require("../Middleware/Multer.js");
const AuthMiddle = require("../Middleware/AuthMiddle.js");
const { PostSingleImage, getSingleImage, UpdateImage } = require("../Controller/SingleProfileImage.js");

router.post("/singleimage", AuthMiddle.AuthVerify, upload.single("image"), PostSingleImage);
router.get("/singlePhoto/:id", AuthMiddle.AuthVerify, getSingleImage);
router.put("/singleupdatephoto/:id", AuthMiddle.AuthVerify, upload.single("image"), UpdateImage);

module.exports = router;
