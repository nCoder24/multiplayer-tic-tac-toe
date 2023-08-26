const express = require("express");

const createApp = (gameRouter) => {
  const app = express();
  app.use(gameRouter);
  
  return app;
};

module.exports = { createApp };
