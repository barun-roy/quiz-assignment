const fs = require("fs");
const express = require("express");
const multer = require("multer");
const { authMiddleware } = require("../middleware/auth");
const { create, getCategories } = require("../controller/category");

const router = express.Router();

router.post("/create", create);

router.get("/getAll", authMiddleware, getCategories);

module.exports = router;
