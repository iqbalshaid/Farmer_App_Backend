const mongoose = require("mongoose");
const DB = async()=>{
    try{
        console.log("how");
       await  mongoose.connect("mongodb+srv://shahidiqbal63209:Shahid786@cluster0.lbxy9hu.mongodb.net/",{
        useNewUrlParser:true,
              useUnifiedTopology:true,
       });
        console.log("database was connected");}
    catch(err){  
        console.log("database was disconnected");

    };
}
module.exports = DB;