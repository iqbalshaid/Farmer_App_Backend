const mongoose = require("mongoose");
const ProfileImage = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        
    },
    name:{
        type:String,
        required:true,
    }
});
const ProfileImages = mongoose.model("image1",ProfileImage);
module.exports = ProfileImages;