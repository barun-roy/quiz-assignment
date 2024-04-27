const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middleware/auth");
const { create, bulkUploadQuestions } = require("../controller/question");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/assets/uploads/"); // Specify the destination directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Customize the file name
  },
});
const upload = multer({ storage: storage });

router.post("/create", authMiddleware, create);
router.post(
  "/bulkUploadQuestions",
  authMiddleware,
  upload.single("csvFile"),
  bulkUploadQuestions
);

module.exports = router;
