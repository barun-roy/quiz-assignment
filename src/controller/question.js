const ResponseService = require("../common/response.service");
const { Category, Question } = require("../model");

const responseService = new ResponseService();

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const create = async (req, res) => {
  try {
    const { text, categories } = req.body;
    let categoryName = [];

    let duplicateCheck = await Question.findOne({ text });

    if (duplicateCheck) {
      return responseService.sent(
        res,
        400,
        [],
        "Question Repeat is not allowed"
      );
    }

    if (categories) {
      categoryName = [...categories.split(",")];
    }

    if (!text || !categoryName || categoryName.length === 0) {
      return responseService.sent(
        res,
        400,
        [],
        "Text and at least one category are required"
      );
    }

    // Find category IDs based on the provided category names
    const categoryIds = await getCategoryIds(categoryName);

    // Create a new question instance
    const newQuestion = new Question({
      text: text,
      categories: categoryIds,
    });

    // Save the question to the database
    await newQuestion.save();

    return responseService.sent(
      res,
      201,
      [],
      "Questions created successfully!"
    );
  } catch (error) {
    console.log("question create error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

// Function to get category IDs based on category names
async function getCategoryIds(categoryNames) {
  let categoryIds = [];
  let category = await Category.find({ name: { $in: categoryNames } });
  categoryIds = category.map((item) => item._id);
  return categoryIds;
}

module.exports = { create };
