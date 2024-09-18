const express = require("express");
const dotenv = require("dotenv");
const DB = require("./Middleware/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const Auth = require("./route/Auth.js");
const Profile = require("./route/Profile.js")
const SingleImage = require("./route/SingleImage.js");
const app = express();
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded ke liye
app.use(express.json()); 
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(cors());
dotenv.config();
app.listen(process.env.PORT,()=>{
    DB();
    console.log("Your Database are Connected",process.env.PORT);
})
app.use("/register",Auth);
app.use("/profile",Profile);
app.use("/image",SingleImage);
