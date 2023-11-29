const User = require("../Models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
exports.resetPasswordToken = async (req, res) => {
  try {
    // get mail from body
    const email = req.body;
    // check mail validations
    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Please provide the email",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Your email is not registered",
      });
    }
    // generate  tokens
    const token = crypto.randomUUID();
    // update user by adding tokens
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpiry: 5 * 60 * 1000,
      },
      { new: true }
    );
    // Generate  urls
    const url = `http://localhost:3000/update-password/${token}`;
    // send  the url to mail
    const mailResponse = await mailSender(
      email,
      "Passwrod Reset Link",
      `The Password reset Link is:  ${url}`
    );
    // send  response as successful
    return res.status(200).json({
      status: 201,
      success: true,
      message: "Link send successfully to your mail",
      MailSender: mailResponse,
    });
  } catch (error) {
    return res.status(401).json({
      status: 401,
      success: false,
      message: "Can not send mail to your Mail ID",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    //   get everything from req
    const { token, password, confirmPassword } = req.body;

    // check for valid input
    if (!token || password || confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Requried all text feild",
      });
    }
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password and confrimPassword is not matching",
      });
    }
    // check for validation of tokens
    const user = await User.findOne({ token: token });
    //  if not present  response will send
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is not present in our DB",
      });
    }
    // check for the expiry for token as well
    if (user.resetPasswordExpiry < Date.now()) {
      return res.status(401).json({
        success: false,
        message: "Token expired!",
      });
    }
    // Hash password
    const newPassword = await bcrypt.hash(password, 10);
    // store in our DB respect to the token  which presetns in  DB
    const updatePasswordResponse = user.findOneAndUpdate(
      { token: token },
      { password: newPassword },
      {new:true}
    );
    // send  response as successful
    return res.status(200).json({
      status: 201,
      success: true,
      message: "Password updated successfully",
      MailSender: updatePasswordResponse,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Can not send mail to your Mail ID",
    });
  }
};
