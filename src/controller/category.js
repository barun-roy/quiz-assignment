const ResponseService = require("../common/response.service");
const { Category } = require("../model");

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

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().select("name description -_id");
    return responseService.sent(res, 200, categories);
  } catch (error) {
    console.log("getCategories error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

module.exports = { create,getCategories };
