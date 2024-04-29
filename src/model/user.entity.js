const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First Name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [isEmail, "Email is invalid"],
    },
    userImage: {
      type: String,
      default: ""
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 7,
      select: false,
    },
    isAdmin:{
      type: Boolean,
      select:false
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
