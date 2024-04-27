const express = require("express");
const { create, login, profile } = require("../controller/user");
const { authMiddleware } = require("../middleware/auth");

const router = express.Router();

router.post("/create", create);
router.post("/login", login);

router.get("/profile", authMiddleware, profile);

module.exports = router;
