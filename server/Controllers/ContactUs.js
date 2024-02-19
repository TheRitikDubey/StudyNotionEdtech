const mailSender = require("../utils/mailSender");
exports.contactUsMailSender = async (req, res) => {
  try {
    const { firstName, lastName, contactNumber, userEmail, message } = req.body;

    if (!firstName || !lastName || !contactNumber || !userEmail || !message) {
      return res.status(404).json({
        success: false,
        message: "Required all feilds",
      });
    }

    const emailResponse = await mailSender(
      userEmail,
      `${firstName} ${lastName} from StudyNotion user`,
      `Hi Ritik, \n\n ${message} \n\n Regards\n\n ${firstName} ${lastName}`
    );
    console.log(emailResponse);
    return res.status(200).json({
      success: true,
      message: "Mail sent to our admin team",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to mail to our admin",
    });
  }
};
