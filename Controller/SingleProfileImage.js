const ProfileImages = require("../models/profileimage");
const Cloudinary = require("../Middleware/Cloudinary")
const AppErr = require("../Middleware/Error");

const PostSingleImage = async (req, res, next) => {
    try {
       
        const upload = await Cloudinary.singleUpload(req.file.path);
        
        if (!upload) {
            return next(new AppErr("Cloudinary did not return a URL", 404));
        }
        const stor = new ProfileImages({
            userId: req.user,
            name: upload.secure_url
        });
        console.log(upload.secure_url);
        if (!stor) {
            return next(new AppErr("Image not uploaded", 404));
        }
        
        await stor.save();
        return res.json({
            success: 1,
            status: 200,
            message: "Image uploaded successfully",
            result: stor
        });
    } catch (error) {
        return next(new AppErr("Internal Server Error", 500));
    }
};

const getSingleImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id,"get");
        const images = await ProfileImages.find({ userId: id });
        if (!images) {
            return next(new AppErr("Images not found", 404));
        }
        return res.json({
            success: 1,
            status: 200,
            message: "Images retrieved successfully",
            result: images
        });
    } catch (error) {
        return next(new AppErr("Internal Server Error", 500));
    }
};

const UpdateImage = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        
        const upload = await Cloudinary.singleUpload(req.file.path);
        if (!upload) {
            return next(new AppErr("Cloudinary did not return a URL", 404));
        }
        const datas = await ProfileImages.findOneAndUpdate({ userId: id }, {
            name: upload.secure_url
        }, { new: true });
        if (!datas) {
            return next(new AppErr("Image not found", 404));
        }
        return res.json({
            success: 1,
            status: 200,
            message: "Photo updated successfully",
            result: datas
        });
    } catch (error) {
        return next(new AppErr("Internal Server Error", 500));
    }
};

module.exports = { PostSingleImage, getSingleImage, UpdateImage };
