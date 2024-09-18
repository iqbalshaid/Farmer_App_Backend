const mongoose = require("mongoose");
const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,

    }
})
const users = mongoose.model("User",user);
module.exports = users;