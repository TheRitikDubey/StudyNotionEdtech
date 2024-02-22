// Require the Cloudinary library
const cloudinary = require('cloudinary').v2;


exports.uploadImageInCloudinary = async (file,folder,quality,height) => {
    // try {
        console.log(file,folder);
        const options = {folder}
        
        if(height){
            options.height = height
        }
        if(quality) {
            options.quality = quality
        }
        options.resourse_type = "auto";
        return await cloudinary.uploader.upload(file.tempFilePath,options);
    // } catch (error) {
    //     console.log("Error while uplaoding image in Cloudinary",error);
    //     console.error("error",error);
    // }
}