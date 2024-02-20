const Course = require("../Models/Courses");
const User = require("../Models/User");
const Tag = require("../Models/Category");
const uploadImageInCloudinary = require("../utils/imageUploader");

exports.getAllCourse = async (req, res) => {
  try {
    const allCourses = Course.find(
      {},
      {
        courseName: true,
        price: true,
        studentsEnrolled: true,
        instructorDetails: true,
        thumbnail: true,
      }
    )
      .populate("instructorDetails")
      .exec();

    return res.status(201).json({
      success: true,
      message: "Response for all your course",
      data: allCourses,
    });
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error while fetching the whole course",
    });
  }
};

exports.CreateCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, tag, whatWillYouLearn, price } =
      req.body;

    const thumbnail = req.files.thumbnailImage;

    // Validation
    if (
      !courseName ||
      !courseDescription ||
      !tag ||
      !whatWillYouLearn ||
      !price
    ) {
      return res.status(401).json({
        success: false,
        message: "Required all feilds",
      });
    }

    // check for instructor
    // TODO instructer ID and the details might not same
    const userId = req.user.id;
    const instructorDetails = User.findById(userId);
    console.log("The instructor details", instructorDetails);

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    // check with the given tag
    const tagDetails = await Tag.findById(tag);
    if (!tagDetails) {
      return res.status(401).json({
        success: false,
        message: "Tag details not found",
      });
    }
    const image = uploadImageInCloudinary(thumbnail, process.env.FOLDER_NAME);
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      courseInstructor: instructorDetails._id,
      whatYouWillLearn,
      price,
      tag: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    // Now add this course to the UserSchema of instructor and student

    await User.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { courses: newCourse },
      },
      { new: true }
    );

    // Update the Tag Schema
    await Tag.findByIdAndUpdate(
      { tag },
      {
        $push: newCourse,
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
    return res.status(401).json({
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
          path: "SubSection",
        },
      })
      .populate("RatingReview")
      .populate({
        path: "instructor",
        populate: {
          path: "additionDetails",
        },
      })
      .populate("Category");

      if(!courseDetails){
        return res.status(404).json({
          success: false,
          message: `Course not found with courseID: ${courseId}`
        })
      }


      return res.status(200).json({
        success: true,
        message: "Sucessfully fetched course details",
        data: courseDetails
      })
  } catch (error) {
    return res.status(501).json({
      success: false,
      message: "Error while fetching course details",
    });
  }
};
