require("dotenv").config();
const cloudinary = require("cloudinary").v2;
    cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.api_key, 
        api_secret: process.env.api_secret
    });

const singleUpload = async (filepath)=>{
    
    try{
        
         const res = await cloudinary.uploader.upload(filepath);
         
         return res;
    }
    catch(error){
      return res.status(500).send("image not upload on cloudinary");
    }
}
const multipleUploads = async (filepaths) => {
    try {
        
        const uploadPromises = filepaths.map(filepath => cloudinary.uploader.upload(filepath));
        
        const results = await Promise.all(uploadPromises);
       
        return results;
    } catch (error) {
        throw new Error("Images not uploaded to Cloudinary");
    }
};

module.exports = {singleUpload,multipleUploads};