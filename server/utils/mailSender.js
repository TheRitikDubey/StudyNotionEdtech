const nodemailer = require("nodemailer");

const mailSender = async (email, title, body) => {
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
      from: "StudyNotion || Ritik Dubey the Admin",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Sucessfully send the email", info);
    return info; //if somebody need any value from this function.
  } catch (error) {
    console.log("Error while sending the mail: ",error);
  }
};
module.exports = mailSender;