const jwt = require("jsonwebtoken");
const ResponseService = require("../common/response.service");

const responseService = new ResponseService();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return responseService.sent(res, 401, []);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return responseService.sent(res, 401, []);
  }
};

module.exports = { authMiddleware };
