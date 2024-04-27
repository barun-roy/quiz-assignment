const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config().parsed;

const DATABASE = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DATABASE)
  .then(() => console.log("Connected to the MongoDB successfully!"))
  .catch((error) => console.log("Error in connection to the database", error));


