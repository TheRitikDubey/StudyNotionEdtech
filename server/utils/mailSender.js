const nodemailer = requireO("nodemailer");

const mailSender = async (email, title, body) => {
  try {
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: "StudyNotion || CodeHelp - by Babbar",
      to: `${email}`,
      subject: `${title}`,
      html: `${body}`,
    });
    console.log("Sucessfully send the email", info);
    return inof; //if somebody need any value from this function.
  } catch (error) {
    console.log("Error while sending the mail: ",error);
  }
};
module.exports = mailSender;