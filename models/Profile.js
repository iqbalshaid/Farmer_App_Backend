const mongoose = require("mongoose");
const Profiles = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        default:""
    },
    Name:{
        type:String,
        required:true,
        default:"shahid"
    },
    Mobile:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
    },
    CropName:{
        type:String,
        required:true
    },
    img:{
        type:[String],
        default:"./public"
    },
    date:{
        type:Date,
        required:true
    }


});
const Profile = mongoose.model("profiles",Profiles);
module.exports = Profile;