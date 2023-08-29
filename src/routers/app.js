const express = require("express");
const cookieParser = require("cookie-parser");
const { logger } = require("../middleware/logger");

const createApp = (authRouter, playgroundRouter) => {
  const app = express();

  app.use(logger);
  app.use(express.json());
  app.use(cookieParser());

  app.get("/", (_, res) => res.redirect("/playground"));
  app.use("/auth", authRouter);
  app.use("/playground", playgroundRouter);

  app.use(express.static("public"));

  return app;
};

module.exports = { createApp };
