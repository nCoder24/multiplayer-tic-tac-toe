const express = require("express");

const createGameRouter = () => {
  const gameRouter = express.Router();

  gameRouter.post("/game/random", (req, res) => {
    res.status(202).end();
  });

  return gameRouter;
};

module.exports = { createGameRouter };
