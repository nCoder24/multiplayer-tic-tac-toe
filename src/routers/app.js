const express = require("express");
const cookieParser = require("cookie-parser");

const createApp = (gameRouter, authRouter) => {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());

  app.use(authRouter);
  app.use(gameRouter);

  return app;
};

module.exports = { createApp };
