const { User } = require("../model");
const { passwordCheck, hashPassword } = require("../common/common.service");
const { signToken } = require("./auth");
const ResponseService = require("../common/response.service");

const responseService = new ResponseService();

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const create = async (req, res) => {
  try {
    const { firstName, lastName, email, password, isAdmin } = req.body;

    let duplicateUserCheck = await User.findOne({email})

    if(duplicateUserCheck){
      return responseService.sent(res, 409, [], 'User already exists!')
    }

    let hashedPassword = await hashPassword(password);

    const user = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email,
      isAdmin,
    });

    await user.save();

    return responseService.sent(res, 201, "user created successfully");
  } catch (error) {
    console.log("create error......", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return responseService.sent(
        res,
        400,
        [],
        "Please enter both email and password"
      );
    }
    const user = await User.findOne({ email }).select("password email isAdmin");

    if (!user) {
      return responseService.sent(res, 404, [], "No user found!");
    }

    let validPassword = await passwordCheck(password, user.password);

    if (!validPassword) {
      return responseService.sent(res, 400, [], "Password is invalid");
    }

    const token = signToken(res, user);

    return responseService.sent(res, 200, { token });
  } catch (error) {
    console.log("login error...........", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select(
      "firstName lastName email userImage -_id"
    );
    if (!user) {
      return responseService.sent(res, 404, [], "User not found!");
    }
    return responseService.sent(res, 200, user);
  } catch (error) {
    console.log("profile error..............", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */

const updateProfile = async (req, res) => {
  try {
    let userId = req.user.userId;
    let updateBody = { ...req.body };
    if (req.file) {
      updateBody["userImage"] = req.file.filename;
    }
    await User.updateOne({ _id: userId }, updateBody, { upsert: true });
    return responseService.sent(res, 200, [], "Profile updated successfully!");
  } catch (error) {
    console.log("update profile error..........", error);
    return responseService.sent(res, 500, [], error.message);
  }
};

module.exports = {
  create,
  login,
  profile,
  updateProfile,
};
