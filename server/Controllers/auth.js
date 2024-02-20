const User = require("../Models/User");
const OTP = require("../Models/otp");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
require("dotenv");
const profile = require("../Models/Profile");
// Send otp
require("dotenv").config();
exports.sendOtp = async (req, res) => {
  try {
    // Fetch email from  the body
    const { email } = req.body;

    // Check if user already present
    const userPresent = await User.findOne({ email });

    if (userPresent) {
      return res.status(401).json({
        success: false,
        message: "User already Present",
      });
    }
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    console.log("Generated OTP", otp);
    // Check unique otp or not
    let checkDuplication = await OTP.findOne({ otp: otp });
    while (checkDuplication) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      checkDuplication = await OTP.findOne({ otp: otp });
    }
    const otpPayload = { email, otp };

    // Creating an entry of OTP.
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP BODY", otpBody);

    // return response succesfully
    res.status(201).json({
      success: true,
      message: "Otp send successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Sign up
exports.signUp = async (req, res) => {
  try {
    // Fetch email from  the body
    const {
      email,
      firstName,
      lastName,
      phoneNumber,
      password,
      confirmPassword,
      accountType,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return res.status(401).json({
        success: false,
        message: "Please Fill all the data properly",
      });
    }

    // Check if user already present
    const userPresent = await User.findOne({ email });

    if (userPresent) {
      return res.status(402).json({
        success: false,
        message: "User already exist please logIn",
      });
    }

    if (password !== confirmPassword) {
      return res.status(402).json({
        success: false,
        message: "Password and confirm password is not same",
      });
    }

    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    console.log("recentOtp", recetOtp);
    // Validate OTP.
    if (recentOtp.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Otp Not Found",
      });
    } else if (otp !== recentOtp) {
      return res.status(403).json({
        success: false,
        message: "Otp Not Matched",
      });
    }

    // return response succesfully
    res.status(201).json({
      success: true,
      message: "Otp send successfully",
    });

    // Hash  Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create entry in  DB
    const profileDetails = await profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });
    const userProfile = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType,
      additionalDetaisl: profileDetails._id,
      Image: `https://api.dicebear.com/5.x/initials/svg?seed= ${firstname} ${lastName}`,
    });
    return res.status(201).json({
      success: true,
      message: "User  Registered Successfully",
      userProfile,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validate data
    if (!email || !password) {
      return res.status(401).json({
        success: false,
        message: "All feilds are  required",
      });
    }
    // check user exist
    const user = await User.findOne({ eamil });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please signup first",
      });
    }
    // Generate JWT  after password matching
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      (user.token = token), (user.password = undefined);

      // Create cookies and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(201).json({
        success: true,
        token,
        user,
        message: "Logged  in successfully and token Generated",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password Incorrect",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Login Failure Please try after sometime",
    });
  }
};
// Change password
exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, currPasswrod, confirmPassword } = req.body;

    // Text  box validations 
    if(!oldPassword || !currPasswrod || !confirmPassword){
      return res.status(401).json({
        status: 401,
        message:"All feilds are required"
      })
    }


    // if curr  and confirm password is not matching

    if (currPasswrod !== confirmPassword) {
      return res.status(401).json({
        status: "401",
        message: "New Password and confirm password is not matching",
      });
    }

    //  check for the valid email
    const user = User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: 401,
        message: "user not exist",
      });
    }
    // if user exist then compare the password

    if (bcrypt.compare(oldPassword, user.password)) {
      const newHashedPassword = await bcrypt.hash(currPasswrod, 10);
      user.password = newHashedPassword;
    }
    return res.status(201).json({
      status: 201,
      message:"Passwrod change successfully"
    })
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message:"Something error occured during changing the password"
    })
  }
};
