const users = require("../models/Auth");
const AppErr = require("../Middleware/Error");
const Verify = require("../Middleware/JWT/Verify");
exports.AuthVerify = async (req,res,next)=>{
    try{
      const { authorization } = req.headers;
      if (!authorization) {
          return res.json({ success: 0, status: app_constants.UNAUTHORIZED, message: 'Please pass the token!', result: {} })
      }
  
      const token = authorization.trim().replace("Bearer ", "");
      if (!token) {
          return res.json({ success: 0, status: app_constants.UNAUTHORIZED, message: 'Invalid token!', result: {} })
      } 
       let decoded = Verify(token);
        if (!decoded) {
            return next(new AppErr("Invalid token", 404));
          }
          
          const data = await users.findById(decoded.id);
          if (!data) {
            return next(new AppErr("Super Admin not found", 404));
          }
        req.user = data._id;
        next(); 
        }

    catch(error){
        next(new AppErr(error.message, 500));
    }
};
