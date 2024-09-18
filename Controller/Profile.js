const Profile = require("../models/Profile");
const AppErr = require("../Middleware/Error")
const Cloudinary = require("../Middleware/Cloudinary")
const Profiles = async (req,res,next)=>{
    try{
        
       const {Name,Mobile,location,city,state,pincode,CropName,date} = req.body;
       const parts = date.split('-');  // Split by "-"
       const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
       
       if(!Name|| !Mobile || !location || !city || !state || !CropName || !formattedDate ||!pincode){
        return next(new AppErr("something are missing",404));
       }
       
       if (!req.files || req.files.length === 0) {
        return next(new AppErr("No files uploaded", 400));
    }

    // Extract file paths from the request
    const filepaths = req.files.map(file => file.path);

    // Upload multiple images to Cloudinary
    const uploadResults = await Cloudinary.multipleUploads(filepaths);
    
    // Check if uploads are successful
    if (!uploadResults || uploadResults.length === 0) {
        return next(new AppErr("Cloudinary did not return image URLs", 404));
    }
    console.log("king");
    // Create and save profile images in the database
    const profileImages = uploadResults.map(result => result.secure_url);
    
       const data = new Profile({userId:req.user,Name,Mobile,location,city,state,pincode,CropName,img:profileImages,date:formattedDate});
       console.log(req.body.Name,"kil",data);
       await data.save();
       
       return res.json({
        success:1,
        status:200,
        message:"Your data are Inserted",
        result:data
       });
    }
    catch(error){
         return next(new AppErr("Internal Server Error",500));
    }
}
const getProfiles = async (req,res,next)=>{
    try{
        const datas = await Profile.find();
        
        
        if(!datas){
            return next(new AppErr("Your data are not found",404));
        }
        console.log(datas,"pol");
        return res.json({
            success:1,
            status:200,
            message:"Your data are",
            result:datas
        })


    }catch(error){
        return next(new AppErr("Internal Server Error",500));
      

    }
};
const UpdateProfiles = async (req,res,next)=>{
    try{
        const id = req.params.id;
        console.log(id)
        const {location,city,state,pincode,CropName,date} = req.body;
        const parts = date.split('-');  // Split by "-"
        const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
       
        if(location.length===0 || !location){
            return next(new AppErr("Your data are not found",404));
        }
        if (!req.files || req.files.length === 0) {
            return next(new AppErr("No files uploaded", 400));
        }
    
        // Extract file paths from the request
        const filepaths = req.files.map(file => file.path);
    
        // Upload multiple images to Cloudinary
        const uploadResults = await Cloudinary.multipleUploads(filepaths);
    
        // Check if uploads are successful
        if (!uploadResults || uploadResults.length === 0) {
            return next(new AppErr("Cloudinary did not return image URLs", 404));
        }
    
        // Create and save profile images in the database
        const profileImages = uploadResults.map(result => result.secure_url);
        const datas = await Profile.findByIdAndUpdate({_id:id},{
            location,city,state,pincode,CropName,img:profileImages,date:formattedDate
        },{
            new:true
        });
        if(!datas){
            return next(new AppErr("Your data are not updated",404));
        };
        return res.json({
            success:1,
            status:200,
            message:"Your data are Updated",
            result:datas
        });

    }
    catch(error){
        return next(new AppErr("Internal Server Error",500));
    }
};
const getParticular = async (req,res,next)=>{
    try{
        const id = req.params.id;
        const datas = await Profile.find({userId:id});
        if(!datas){
            return next(new AppErr("Your data are not updated",404));

        }
        return res.json({
            success:1,
            status:200,
            message:"your id are found",
            result:datas
        })

    }
    catch(error){
        return next(new AppErr("Internal Server Error",500));

    }
}; 
module.exports = 
{Profiles,
getProfiles,
UpdateProfiles,
getParticular};