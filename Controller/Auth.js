const SendEmail = require("../Middleware/SendEmail");
const GenerateToken = require("../Middleware/JWT/Generate")
const AppErr = require("../Middleware/Error")
const users = require("../models/Auth")
let otp;

const login = async (req,res,next)=>{
    console.log(SendEmail,"jjk");
    try{
   const {email} = req.body;
   
   
   let digit = "0123456789";
  otp = "";

  for(let i=0;i<6;i++){
    otp += digit[Math.floor(Math.random()*10)];
  }
  
 const data =  await SendEmail(email,otp);
 console.log(email,otp);
 const existingUsers = await users.find({ email });
    console.log(existingUsers,"lo")    
 if (existingUsers.length === 0) {
     const user = new users({ email });
     await user.save();
 }

 return res.json({
     success: 1,
     status: 200,
     message: "OTP has been sent",
     result: data
 });
    }
    catch(error){
 return next(new AppErr(error.message,500));
    }
};
const Verify = async (req,res,next)=>{
try{
    const {otps,email} = req.body;
    console.log(otps,otp,"kil")
    if(otp!=otps){
        return next(new AppErr("your OTP was not match",404))
    }
    const user = await users.findOne({email});
    console.log(user._id,"kaise ho")
    const token = GenerateToken(user);
    return res.json({
        success:1,
        status:200,
        message:"you are Loged in",
        result:{
            token,
            userId:user._id
        }
    })
}
catch(error){
    return next(new AppErr(error.message,500));
}
};
module.exports = {login,Verify}