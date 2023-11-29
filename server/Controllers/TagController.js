const Tag = require("../Models/tags");

exports.createTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validate the data
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }
    const tagDetails = await Tag.create({
      name: name,
      description: description,
    });
    console.log("Tag detials", tagDetails);
    return res.status(201).json({
      success: true,
      message: "Tag is create in our DB",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Error while creating the tag",
    });
  }
};

exports.showAllTag = async (req, res) => {
  try {
    const allTag = await Tag.find({}, { name: true, description: true });

    return res.status(201).json({
      success: true,
      message: "Get all the Tags from Tag",
      data: allTag,
    });
  } catch (error) {
    return res.status(401).json({
        success: false,
        message: "Error while fetching the tage from the DB"
    })
  }
};
