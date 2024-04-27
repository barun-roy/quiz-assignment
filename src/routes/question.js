const fs = require("fs");
const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middleware/auth");
const { create } = require("../controller/question");

const router = express.Router();

router.post("/create", authMiddleware, create);

module.exports = router;
