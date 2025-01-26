const nodemailer = require("nodemailer");

// This function is used to send the mail to Me in my portolio's. 
const publicMailSender = async (email, name, body) => {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: false,
      port:587,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: email || "Ritik Dubey the Admin",
      to: process.env.MAIL_USER,
      subject: `Message from ${name} with email ${email}`,
      html: `${body}`,
    });
    // console.log("Sucessfully send the email", info);
    return info; //if somebody need any value from this function.
  } catch (error) {
    console.log("Error while sending the mail: ",error);
  }
};
module.exports = publicMailSender;