const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  create,
  getCategories,
  getQuestionsForEachCategory,
  bulkInsertCategory,
} = require("../controller/category");

const router = express.Router();

router.post("/create", authMiddleware, create);
router.post("/bulkInsertCategory", authMiddleware, bulkInsertCategory);

router.get("/getAll", authMiddleware, getCategories);
router.get(
  "/questions/:categoryName?",
  authMiddleware,
  getQuestionsForEachCategory
);

module.exports = router;
