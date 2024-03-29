const Course = require("../Models/Courses");
const Section = require("../Models/Section");

exports.createSection = async (req,res)=>{
    try {
        const {sectionName,courseId} = req.body;
        if(!sectionName || !courseId){
            return res.stats(401).json({
                success: false,
                message:"Unable to get sectionName or courseId"
            })
        }
        // create section in our DB
        const newSection = await Section.create({sectionName});
        // Now update the SectionID in our course Schema
        const updateCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection.id,
                }

            },
            {new: true},
            // Here we need to populate the with respect to section and subSection both.
        ).populate({
            path: "courseContent",
            populate:{
                path: "subSection",
            },
        })
        return res.status(201).json({
            success: true,
            message:"Successfully create your section",
            warning:"Need to populate Section and subsection data both",
            data: updateCourseDetails
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while creating the section of the course"
        })
    }
}

exports.updateSection = async (req,res)=>{
    try {
        const {sectionName,sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success: false,
                message:"Unable to get updated sectionName or courseId"
            })
        }
        // update section in our DB
        const updateSection = await Section.findByIdAndUpdate(sectionId,{sectionName}, {new:true});
        // Response
        return res.status(201).json({
            success: true,
            message:"Successfully updated your section",
            updateSection
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while updating the section of the course",
            error: error.message
        })
    }
}

exports.deleteSection = async (req,res)=>{
    try {
        // Here we are sending id in params
        const {sectionId} = req.params;
        if(!sectionId){
            return res.stats(401).json({
                success: false,
                message:"Unable to get the Section Id"
            })
        }
        // delete section in our DB
        const deleteSection = await Section.findByIdAndDelete({sectionId});
        // TODO [testting] Do we need to delete the section ID from courses (I feel yes)
        // Response
        return res.status(201).json({
            success: true,
            message:"Successfully deleted your section",
            deleteSection
        })

    } catch (error) {
        return res.status(501).json({
            success: false,
            message:"Error while deleting the section of the course"
        })
    }
}