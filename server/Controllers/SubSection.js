const SubSection = require("../Models/SubSection");
const Section = require("../Models/Section")
const { uploadImageInCloudinary } = require("../utils/imageUploader")

exports.createSubSection = async (req, res) => {
    try {
        const { SectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;
        if (!SectionId || !title || !timeDuration || !description || !video) {
            return res.stats(401).json({
                success: false,
                message: "Unable to get all the requried feilds"
            })
        }
        // create secure link for the video.
        const uploadVideo = uploadImageInCloudinary(video, process.env.FOLDER_NAME);
        
        const subSectionDetails = await SubSection.create({
            title: title,
            titleDuration: timeDuration,
            description: description,
            videoUrl: uploadVideo.secure_url,
        })
        const updateSection = await Section.findByIdAndUpdate({_id: SectionId},{
            $push:{
                subSection: subSectionDetails._id,
            }
        },{new:true}).populate("subSection")

        // return response
        return res.status(201).json({
            success: true,
            message: "Sucessfully created the subsection",
            updateSection
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while creating the subsection for the course",
            error: error.message
        })

    }
}

// Need to think about it still pending
exports.updateSubSection = async (req, res) => {
    try {
        const {title, timeDuration, description } = req.body;
        const video = req.files.videoFile;
        if (!title || !timeDuration || !description || !video) {
            return res.stats(401).json({
                success: false,
                message: "Unable to get all the requried feilds"
            })
        }
        // create secure link for the video.
        const uploadVideo = uploadImageInCloudinary(video, process.env.FOLDER_NAME);
        
        const subSectionDetails = await SubSection.create({
            title: title,
            titleDuration: timeDuration,
            description: description,
            videoUrl: uploadVideo.secure_url,
        })
        const updateSection = await Section.findByIdAndUpdate({_id: SectionId},{
            $push:{
                subSection: subSectionDetails._id,
            }
        },{new:true})
        // HW update populate query to get the data of subssection as well in the response

        // return response
        return res.status(201).json({
            success: true,
            message: "Sucessfully created the subsection",
            updateSection
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while creating the subsection for the course",
            error: error.message
        })

    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const {subSectionId} = req.body;
        if (!subSectionId) {
            return res.stats(401).json({
                success: false,
                message: "Unable to get sub section ID"
            })
        }
        // EDGE case how will we delete the video on the cloudinary (Code below)
        
        // delte sub section
        const deleteSubSection = SubSection.findByIdAndDelete({subSectionId});

        // delte this from subSection id;
        const delteSubSectionID = Section.findOneAndDelete({subSection:subSectionId});


        // return response
        return res.status(201).json({
            success: true,
            message: "Sucessfully Deleted the subsection",
            delteSubSectionID
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while deleting the subsection for the course",
            error: error.message
        })

    }
}

