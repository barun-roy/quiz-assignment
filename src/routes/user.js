const fs = require('fs')
const express = require("express");
const multer = require("multer");
const { create, login, profile, updateProfile } = require("../controller/user");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = "src/assets/uploads/";
    fs.mkdir(directory, { recursive: true }, (err) => {
      if (err) {
        return cb(err);
      }
      cb(null, directory);
    });
  },
  filename: function (req, file, cb) {
    const date = new Date();
    const formattedDate =
      date.getFullYear().toString().padStart(4, "0") +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0");
    cb(null, formattedDate + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/create", create);
router.post("/login", login);
router.post(
  "/updateProfile",
  authMiddleware,
  upload.single("userImage"),
  updateProfile
);

router.get("/profile", authMiddleware, profile);

module.exports = router;
