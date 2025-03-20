const { default: mongoose } = require("mongoose");
const { instance } = require("../config/RazorpayConfig");
const Course = require("../Models/Courses");
const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
// add html mailSender template
const {
  courseEnrollmentEmail,
} = require("../mail/Templates/courseEnrolledEmail");

exports.capturePayment = async (req, res) => {
  try {
    const { CourseId } = req.body;
    const userId = req.user.id;
    // validation
    if (!CourseId) {
      return res.status(404).json({
        success: false,
        message: "Course Id not found",
      });
    }
    let course;
    try {
      course = await Course.findById(CourseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
      // Check are we already enrolled or not
      let uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnrolled.includes(uid)) {
        return res.status(200).json({
          success: false,
          message: "Student is already enrolled",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    // create order for payment
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: CourseId,
        userId,
      },
    };
    try {
      // initiate the payment using razorpay TO be uncommented
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      //return response
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: paymentResponse.id,
        currency: paymentResponse.currency,
        amount: paymentResponse.amount,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Could not initiate order",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Could not start the payment",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const webHookSecret = "123456";
  const signature = req.headers["x-razorpay-signature"];

  const shasum = crypto.createHmac("sha256", webHookSecret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (signature === digest) {
    console.log("Payment is authorized");

    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      // full fill the course
      // find the course and enroll the student
      const enrolledCourse = await Course.findOneAndUpdate(
        { _id: courseId },
        { $push: { studentsEnrolled: userId } },
        { new: true }
      );
      if (!enrolledCourse) {
        return res.status(500).json({
          success: false,
          message: "Course not found",
        });
      }
      console.log(enrolledCourse);

      // Find the studnet and add the course to their list enrolled courses.
      const enrolledStudent = await User.findOneAndUpdate(
        { _id: userId },
        { $push: { courses: courseId } },
        { new: true }
      );
      console.log(enrolledStudent);
      //mail send krdo confirmation wala
      const emailResponse = await mailSender(
        enrolledStudent.email,
        "Congratulations from CodeHelp",
        "Congratulations, you are onboarded into new CodeHelp Course"
      );

      console.log(emailResponse);
      return res.status(200).json({
        success: true,
        message: "Signature Verified and COurse Added",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
};
