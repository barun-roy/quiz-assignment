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
    const { name, description } = req.body;
    if (!name) {
      return responseService.sent(res, 400, [], "Category Name is required");
    }
    let category = new Category({ name, description });
    category.save();
    return responseService.sent(res, 200, [], "Category created successfully");
  } catch (error) {
    console.log("category create error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};
/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const bulkInsertCategory = async (req, res) => {
  try {
    const categories = req.body;
    if (!Array.isArray(categories) || categories.length === 0) {
      return responseService.sent(res, 400, [], "No categories provided");
    }
    const insertedCategories = await Category.insertMany(categories);
    return responseService.sent(res, 200, insertedCategories, "Categories created successfully");
  } catch (error) {
    console.log("Bulk insert category error:", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name description -_id");
    return responseService.sent(res, 200, categories);
  } catch (error) {
    console.log("getCategories error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const getQuestionsForEachCategory = async (req, res) => {
  try {
    let categoryName = req.params.categoryName || null;

    let categoryNameArr = [];

    let condition = [
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "categories",
          as: "questions",
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          questions: {
            $map: {
              input: "$questions",
              as: "question",
              in: { text: "$$question.text" },
            },
          },
        },
      },
    ];

    if (categoryName) {
      categoryNameArr = categoryName.split(",");
      condition.unshift({ $match: { name: { $in: categoryNameArr } } });
    }

    const categoriesWithQuestions = await Category.aggregate(condition);

    return responseService.sent(res, 200, categoriesWithQuestions);
  } catch (error) {
    console.log("getQuestionsForEachCategory error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

module.exports = { create,bulkInsertCategory, getCategories, getQuestionsForEachCategory };
