const express = require("express");
const { authMiddleware } = require("../middleware/auth");
const {
  create,
  getCategories,
  getQuestionsForEachCategory,
} = require("../controller/category");

const router = express.Router();

router.post("/create", create);

router.get("/getAll", authMiddleware, getCategories);
router.get(
  "/questions/:categoryName?",
  authMiddleware,
  getQuestionsForEachCategory
);

module.exports = router;
