const Profile = require("../Models/Profile");
const User = require("../Models/User");
const {uploadImageInCloudinary} = require("../utils/imageUploader")

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    // get userID
    const _id = req.user.id;
    // validate
    if (!contactNumber || !gender || !_id) {
      return res.status(404).json({
        sucess: false,
        message:
          "Unable to get all required feilds in update Profile controler",
      });
    }
    // check for profile ID
    const userDetails = await User.findById(_id);
    const ProfileDetails = await Profile.findById(
      userDetails.additionalDetails
    );
    // update the profile with values
    ProfileDetails.dateOfBirth = dateOfBirth;
    ProfileDetails.about = about;
    ProfileDetails.contactNumber = contactNumber;
    ProfileDetails.gender = gender;
    // save or update in our DB
    await ProfileDetails.save();

    // return response
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully updated or created the profile",
      user: ProfileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      sucess: false,
      message: "Unable to create or update the profile",
      error: error,
    });
  }
};

// Delete user
exports.deleteProfile = async (req, res) => {
  try {
    // get userID
    const _id = req.User.id;
    const userDetails = await User.findById(_id);
    // validate
    if (!userDetails) {
      return res.status(404).json({
        sucess: false,
        message: "Not a valid user",
      });
    }
    // if user is going to be deleted then we should remove them from the course enrolled as well.
    // TODO: while testing check are we able to delte the user from course enrolled as well.
    // const courseCountDelete = courses.findOneAndDelete({studentsEnrolled: _id});

    const userProfile = await Profile.findByIdAndDelete({
      _id: userDetails.additionalDetails,
    });
    const deleteUser = await User.findByIdAndDelete(_id);

    // return response
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully delted the profile",
      user: deleteUser,
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Unable to delete the profile the profile",
    });
  }
};

// Get User data
exports.getUserDetailsData = async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additionalDetails")
      .exec();
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully fetched the data",
      userData: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      sucess: false,
      message: "Error while fetching the data",
    });
  }
};

// get all courses subscribed by the user.
exports.getEnrolledCourse = async (req, res) => {
  try {
    // get user id from our middleware
    const userId = req.user.id;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check for user Details
    const userDetails = await User.findOne({ userId }).populate("courses");
    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: "Unable to search course for this user",
    });
  }
};
// for update the profile picture
exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture
    const userId = req.user.id
    const image = await uploadImageInCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};
