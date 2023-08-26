const express = require("express");
const gameRouter = express.Router();

gameRouter.post("/game/random", (req, res) => {
  res.status(202).end();
});

module.exports = gameRouter;
