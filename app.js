const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config().parsed;
const ServerError = require("./src/utils/serverError");
const errorHandler = require("./src/controller/error");
const userRouter = require("./src/routes/user");
const multer = require("multer");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/api/v1/user", userRouter);

app.all("*", (req, res, next) => {
  next(
    new ServerError(
      `No route with ${req.originalUrl} exists on the server`,
      404
    )
  );
});

app.use(errorHandler);

module.exports = app;
