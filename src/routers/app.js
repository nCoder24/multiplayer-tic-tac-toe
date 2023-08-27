const express = require("express");
const cookieParser = require("cookie-parser");

const createApp = (authRouter, playgroundRouter) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(authRouter);
  app.use(playgroundRouter);

  app.use(express.static("public"));

  return app;
};

module.exports = { createApp };
