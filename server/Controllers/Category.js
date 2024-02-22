const Category = require("../Models/Category");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    // validate the data
    if (!name) {
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
      categoryDetails
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

exports.categoryPageDetails = async (req,res) => {
  try {
    // get category wrt to categoryID
    const {categoryId} = req.body
    const selectedCategory = await Category.findById(categoryId).populate("courses").exec();

    // validate
    if(!selectedCategory){
      return res.status(404).json({
        success: false,
        message:"Category Id is not found"
      })
    }
    if(selectedCategory.course.length === 0){
      return res.status(404).json({
        success: false,
        message:"Courses not found for this category"
      })
    }
    // Course for the we select the category
    const selectedCourses = selectedCategory.course;

    // show courses which are not from the same category
    const categoryExpectSelected = await Category.findById({_id: {$ne: categoryId}}).populate("course").exec();
    let differentCourses = [];
    for(const category of categoryExpectSelected){
      differentCourses.push(...category.course)
    }
    // show courses which are top selling.
    const allCategory = await Category.find({}).populate("course");
    const allCourses = allCategory.flatMap((category)=> (category.course));
    const mostSellingCourses = allCourses.sort((a,b)=> b.sold - a.sold).slice(0,10);

    return res.status(200).json({
      success: true,
      selectedCourses: selectedCourses,
      differentCourses: differentCourses,
      mostSellingCourses: mostSellingCourses
    })
  } catch (error) {
    console.log(error);
    return res.status(501).json({
      success: false,
      message:"Error while fetcing the category from the DB"
    })
  }
}