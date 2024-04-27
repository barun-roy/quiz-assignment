const fs = require('fs')
const express = require("express");
const multer = require("multer");
const { create, login, profile, updateProfile } = require("../controller/user");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router()

module.exports = router