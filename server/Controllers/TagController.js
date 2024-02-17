const Category = require("../Models/Category"); 

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validate the data
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All feilds are required",
      });
    }
    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });
    console.log("Category detials", categoryDetails);
    return res.status(201).json({
      success: true,
      message: "Category is create in our DB",
    });
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message: "Error while creating the Category",
    });
  }
};

exports.showAllCategory = async (req, res) => {
  try {
    const allCategory = await Category.find({}, { name: true, description: true });

    return res.status(201).json({
      success: true,
      message: "Get all the Categorys from Category",
      data: allCategory,
    });
  } catch (error) {
    return res.status(401).json({
        success: false,
        message: "Error while fetching the Categorye from the DB"
    })
  }
};
