const bcrypt = require("bcrypt");

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 12);
  } catch (error) {
    console.log("password hashing error..........");
    throw error;
  }
};

const passwordCheck = async (inputPassword, userPassword) => {
  try {
    const passwordCheck = await bcrypt.compare(inputPassword, userPassword);
    return passwordCheck;
  } catch (error) {
    console.log("password check error..........", error);
    throw error;
  }
};

module.exports = {
  passwordCheck,
  hashPassword,
};
