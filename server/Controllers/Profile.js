const Profile = require("../Models/Profile");
const User = require("../Models/User");

exports.updateProfile=(async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNuber, gender } = req.body;
    // get userID
    const _id = req.user.id;
    // validate
    if (!contactNuber || !gender || !_id) {
      return res.status(401).json({
        sucess: false,
        message:
          "Unable to get all required feilds in update Profile controler",
      });
    }
    // check for profile ID
    const userDetails = await User.findById(_id);
    const ProfileDetails = await Profile.findById(ProfileId);
    // update the profile with values
    ProfileDetails.dateOfBirth = dateOfBirth;
    ProfileDetails.about = about;
    ProfileDetails.contactNumber = contactNuber;
    ProfileDetails.gender = gender;
    // save or update in our DB
    await ProfileDetails.save();

    // return response
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully updated or created the profile",
      // user: ProfileDetails
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Unable to create or update the profile",
    });
  }
});

// Delete user
exports.deleteProfile=(async (req, res) => {
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
});

// Get User data
exports.getUserDetailsData = (async (req, res) => {
  try {
    const id = req.user.id;

    const userDetails = await User.findById(id)
      .populate("additonalDetials")
      .exec();
    return res.status(201).json({
      sucess: true,
      message: "Sucessfully fetched the data",
      userData: userDetails,
    });
  } catch (error) {
    return res.status(401).json({
      sucess: false,
      message: "Error while fetching the data",
    });
  }
});