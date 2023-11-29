const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  otp: {
    type: String,
    require: true,
  },
  timeStamp: {
    type: Date,
    trim: Date.now(),
    expires: 5 * 60,
  },
});
const sendVerificationEmail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      otp
    );
    console.log("MailResponse in OPT.js Middleware pre", mailResponse);
  } catch (error) {
    console.log("error occured while sending mails: ", error);
    throw error;
  }
};
otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
