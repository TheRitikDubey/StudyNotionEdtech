const Course = require("../Models/Courses");
const User = require("../Models/User");
const Category = require("../Models/Category");
const { uploadImageInCloudinary } = require("../utils/imageUploader");
const Courses = require("../Models/Courses");
const Section = require("../Models/Section");
const SubSection = require("../Models/SubSection");

exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        studentsEnrolled: true,
        instructorDetails: true,
        thumbnail: true,
      }
    )
      .populate("instructor")
      .exec();
    if(!allCourses){
      return res.status(404).json({
        success: false,
        message:"All courses not found",
      })
    }

    return res.status(201).json({
      success: true,
      message: "Response for all your course",
      data: allCourses,
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Error while fetching the whole course",
      error: error.message
    });
  }
};

exports.CreateCourse = async (req, res) => {
  try {
    let {
      courseName,
      courseDescription,
      category,
      status,
      whatYouWillLearn,
      price,
      instructions,
    } = req.body;

    const thumbnail = req.files.thumbnailImage;

    // Validation
    if (
      !courseName ||
      !courseDescription ||
      !category ||
      !whatYouWillLearn ||
      !price ||
      !thumbnail
    ) {
      return res.status(401).json({
        success: false,
        message: "Required all feilds",
      });
    }

    // check for instructor
    // TODO instructer ID and the details might not same
    const userId = req.user.id;
    if (!status || status === undefined) {
      status = "Draft";
    }

    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // check with the given category
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(401).json({
        success: false,
        message: "category details not found",
      });
    }
    const uploadedImage = await uploadImageInCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      category: categoryDetails._id,
      thumbnail: uploadedImage.secure_url,
      instructions: instructions,
      status: status,
    });

    // Now add this course to the UserSchema of instructor and student

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse },
      },
      { new: true }
    );

    // Update the category Schema
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: newCourse._id,
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course is created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error while fetching the course",
      data: error.message,
    });
  }
};

exports.getCourse = async (req, res) => {
  try {
    const { id } = req.body;
    const ourCourse = Course.findById(id).populate("instructorDetails").exec();

    return res.status(201).json({
      success: true,
      message: "Response for your course",
      data: ourCourse,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error while fetching the course",
    });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    const courseDetails = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .populate("ratingReview")
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category");

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: `Course not found with courseID: ${courseId}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sucessfully fetched course details",
      data: courseDetails,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error while fetching course details",
      error: error.message
    });
  }
};

exports.updateCourse = async(req,res) => {
  try {
      const {courseId,courseName,courseDescription,price,tag,whatYouWillLearn,category} = req.body;
      const thumbnailImage = req.files.thumbnailImage;

      if(!courseId || !courseName || !courseDescription || !thumbnailImage || !price || !tag || !whatYouWillLearn || !category){
        return res.status(401).json({
          success: false,
          message:"unable to get all the required field"
        })
      }
      const isCourseAvailable = await Courses.findById(courseId);
      if(!isCourseAvailable){
        return res.status(404).json({
          success: false,
          message:"Course is not present in our system"
        })
      }

      const uploadedImage = await uploadImageInCloudinary(
        thumbnailImage,
        process.env.FOLDER_NAME
      );

      const updateCourse = await Courses.findByIdAndUpdate({_id:courseId},{
        courseName: courseName,
        courseDescription: courseDescription,
        whatYouWillLearn: whatYouWillLearn,
        price: price,
        thumbnail: uploadedImage.secure_url,
        tag: tag,
        category: category,
      })

      return res.status(200).json({
        success: true,
        message:"Course updated successfully",
        updateCourse: updateCourse
      })
      
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:"Error while updating the course",
      error: error.message
    })
  }
}

exports.getInstructorCourses = async (req,res) => {
    try {
      const instructerId = req.user.id
      const instructerCourses = await Courses.find({
        instructor: instructerId
      }).sort({createdAt: -1});
      return res.status(200).json({
        success: true,
        data: instructerCourses
      })
    } catch (error) {
      console.error("Error",error)
      return res.status(500).json({
        success: false,
        message: "Unable to get any courses for the instructor check userID"
      })
    }
}

exports.deleteCourse = async (req,res) => {
  try {
    const { courseId } = req.body;
    if(!courseId){
      return res.status(404).json({
        success: false,
        message: "courseId is not present"
      })
    }
    //Delete from the enrolled courses from the student accounts.
    const course = await Course.findById(courseId);
    if(!course){
      return res.status(404).json({
        success: false,
        message: "course not found"
      })
    }
    const studentsEnrolled = course.studentsEnrolled;
    // Find the Courseid from the user and delete
    for(const studentId of studentsEnrolled){
      await User.findByIdAndUpdate(studentId,{
        $pull: {courses: courseId},
      })
    }

    // Delete the sections and sub-sections
    const courseSection = course.courseContent;
    for(const sectionId of courseSection){
      const section = await Section.findById(sectionId);
      if(section){
        const subSection = section.subSection;
        for(const subSectionId of subSection){
          await SubSection.findByIdAndDelete(subSectionId);
        }
      }
      // Delete the Section as well
      await Section.findByIdAndDelete(sectionId);
    }

    await Course.findOneAndDelete(courseId);
    return res.status(200).json({
      success: true,
      message: "The Course is successfully deleted"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete the course"
    })
  }
}
