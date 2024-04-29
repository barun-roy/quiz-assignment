const jwt = require("jsonwebtoken");
const ResponseService = require("../common/response.service");

const responseService = new ResponseService();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return responseService.sent(res, 401, []);
    }
    const decoded = jwt.verify(token, '0fb46e81c559d1f94cfaf4c5d3c0912e');
    req.user = decoded;
    next();
  } catch (error) {
    return responseService.sent(res, 401, []);
  }
};

module.exports = { authMiddleware };
