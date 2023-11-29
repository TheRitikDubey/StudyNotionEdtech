// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;


exports.uploadImageInCloudinary = async (file,folder,quality,height) => {
    try {
        const {options} = folder
        if(height){
            options.height = height
        }
        if(quality) {
            options.quality = quality
        }
        options.resourse_type = "auto";
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: "Failed while uploading to Cloudinary"
        })
    }
}