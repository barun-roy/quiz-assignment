const jwt = require("jsonwebtoken");
const ResponseService = require("../common/response.service");

const responseService = new ResponseService();

const signToken = (res, user) => {
  try {
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: user.isAdmin },
      '0fb46e81c559d1f94cfaf4c5d3c0912e',
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.log("sign token error..........", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

module.exports = { signToken };
