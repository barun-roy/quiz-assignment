const fs = require("fs");
const csvParser = require("csv-parser");
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const bulkUploadQuestions = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No CSV file uploaded" });
    }

    const csvFilePath = req.file.path;
    const questions = [];

    let categories = await Category.find({}).select("name");
    let catObj = {};
    categories.forEach((item) => {
      catObj[item.name] = item["_id"];
    });

    // Read the CSV file, parse its contents, and push questions to the array
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())
      .on("data", (row) => {
        // Assuming each row in the CSV file represents a question with text and categories
        let rowCatArr = [];
        row.categories.split(", ").map((item) => {
          rowCatArr.push(catObj[item]);
        });
        questions.push({
          text: row[Object.keys(row)[0]],
          categories: rowCatArr,
        });
      })
      .on("end", async () => {
        // Insert questions into the database

        await Question.insertMany(questions);

        // Delete the uploaded CSV file after processing
        fs.unlinkSync(csvFilePath);

        return responseService.sent(
          res,
          201,
          [],
          "Questions added successfully"
        );
      });
  } catch (error) {
    console.log("error in importing the questions..............", error);
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

module.exports = { create, bulkUploadQuestions };
