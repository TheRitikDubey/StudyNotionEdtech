const User = require("../Models/User");
const OTP = require("../Models/Otp");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcryptjs");
const axios = require("axios")
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
      OTP: otp,
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
      phoneNumber = "",
      password,
      confirmPassword,
      accountType,
      otp,
    } = req.body;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !password ||
      !confirmPassword ||
      !otp
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
    console.log("recentOtp", recentOtp);
    // Validate OTP.
    if (recentOtp.length === 0) {
      return res.status(403).json({
        success: false,
        message: "Otp Not Found",
      });
    } else if (otp !== recentOtp[0].otp) {
      console.log(recentOtp[0].otp);
      return res.status(403).json({
        success: false,
        message: "Otp Not Matched",
      });
    }

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
      phoneNumber,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      Image: `https://api.dicebear.com/5.x/initials/svg?seed= ${firstName} ${lastName}`,
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
    const { email, password, accountType } = req.body;
    // Validate data
    if (!email || !password || !accountType) {
      return res.status(401).json({
        success: false,
        message: "All feilds are  required",
      });
    }
    // check user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered, Please signup first",
      });
    }
    if (user.accountType!==accountType) {
      return res.status(404).json({
        success: false,
        message: `User present but not as an ${accountType}`,
      });
    }
    // Generate JWT  after password matching
    if (bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(
        { email: user.email, id: user._id, accountType: user.accountType },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );
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
    console.log(error);
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
    if (!oldPassword || !currPasswrod || !confirmPassword) {
      return res.status(401).json({
        status: 401,
        message: "All feilds are required",
      });
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
      message: "Passwrod change successfully",
    });
  } catch (error) {
    return res.status(501).json({
      status: 501,
      message: "Something error occured during changing the password",
    });
  }
};

exports.RedirectsToGoogleOAuth = async (req,res) => {
  const redirectUri = 'https://accounts.google.com/o/oauth2/v2/auth';
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',  // Always ask for consent (optional)
    });
    res.redirect(`${redirectUri}?${params.toString()}`);
}

// Handle the OAuth callback
exports.HandleAuthCallbackForGoogleOAuth = async (req,res) => {
  const code = req.query.code;
    if (!code) return res.status(400).send('No code found.');

    try {
        // Exchange code for tokens
        const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: process.env.GOOGLE_REDIRECT_URI,
            grant_type: 'authorization_code',
        });
        console.log("TR",tokenResponse);
        
        const { id_token, access_token } = tokenResponse?.data;

        // Use id_token to get user info
        const userInfoResponse = await axios.get(
            `https://openidconnect.googleapis.com/v1/userinfo`,
            { headers: { Authorization: `Bearer ${access_token}` } }
        );
        
        const user = userInfoResponse?.data || userInfoResponse;
        console.log(user);
        
        // You can now create a session, JWT, or anything you want
        // return res.json({
        //     message: 'User info fetched successfully!',
        //     user,
        //     id_token
        // });
        // Generate your own JWT
        const appToken = jwt.sign(
          { userId: user.sub, email: user.email },
          'your_jwt_secret_key', // keep this safe
          { expiresIn: '24h' }
      );

      // Redirect user back to React app with token
      res.redirect(`http://localhost:3000/login/success?token=${appToken}`);

    } catch (error) {
        console.error('Error exchanging code for tokens:', error);
        res.status(500).send('Authentication failed');
    }
}

exports.verifyOAuthUser = (req,res) => {
  const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send('No token provided.');

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded }); // Send back user info
    } catch (error) {
        res.status(401).send('Invalid token.');
    }
}
