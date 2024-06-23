const RatingAndReview = require("../Models/RatingAndReview");
const Courses = require("../Models/Courses");
const { default: mongoose } = require("mongoose");
const users = require("../Models/User")

// create Rating&Review
exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;
    // console.log("body",req.body);
    // validate
    if (!courseId || !rating || !review) {
      return res.status(404).json({
        success: false,
        message: "All feild are not present",
      });
    }
    // check if user enrolled in the course or not.
    const courseDetails = await Courses.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetails) {
      return res.status(404).json({
        sucess: false,
        message: "Students is not enrolled in the course",
      });
    }
    // Check if user alredy submited the review
    const isAlreadyPresent = await RatingAndReview.findOne(
      { user: userId },
      { course: courseId }
    );
    if (isAlreadyPresent) {
      return res.status(403).json({
        sucess: false,
        message: "User already submit rating and review for this course",
      });
    }
    const ratingReview = await RatingAndReview.create({
      Rating: rating,
      Review: review,
      course: courseId,
      user: userId,
    });
    // update the rating in course Schema as well
    const updatedCourseDetials = await Courses.findByIdAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingReveiew: ratingReview._id,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      sucess: true,
      message: "Rating and Review sucessfully submited",
      RatingAndReview,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "Error while submiting the rating and review",
    });
  }
};

// Get average Rating
exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.CourseId;
    // calc avg rating
    const getAverageRating = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$Rating" },
        },
      },
    ]);
    if (getAverageRating.length > 0) {
      return res.status(200).json({
        sucess: true,
        message: `Average Rating is ${getAverageRating[0].averageRating}`,
        averageRating: getAverageRating[0].averageRating,
      });
    }
    return res.status(200).json({
      sucess: true,
      message: `Average Rating is 0`,
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error while getting the average rating",
    });
  }
};

// Get all rating and review
exports.getAllRatingAndReview = async (req, res) => {
  try {
    const allReview = await RatingAndReview.find({}).sort({rating: "desc"}).populate({
        path: "User",
        select: "firstName lastName email image"
    }).populate({
      options: {strictPopulate: false},
        path: "Course",
        select:"courseName"
    }).exec();

    return res.status(200).json({
        sucess: true,
        message:"Successfully fetched all the rating and review",
        allReview: allReview
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "Error while getting all the rating and review",
    });
  }
};

// Get Rating wrt to courseID
exports.getRatingAndReviewForCourse = async (req,res) => {
    try {
        // get courseid
        const {courseId} = req.body;
        // validate courseid
        if(!courseId){
            return res.status(404).json({
                sucess: false,
                message:"Course id not found"
            })
        }
        // findbyid
        const getRatingByCourseId = await Courses.findById({_id: courseId}).sort({rating: "desc"}).populate({
            path: "User",
            select: "firstName lastName email i mages"
        }).populate({
            path: "Course",
            select:"courseName"
        }).exec();
        
        return res.status(200).json({
            sucess: true,
            message: "Successfully fetched all the rating and review for this course",
            rating: getRatingByCourseId,
        })
        
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message:"Error while getting the rating for this course"
        })
    }
}