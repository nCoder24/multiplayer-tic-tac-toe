const express = require("express");

const createRoom = (req, res) => {
  const id = req.context.idGenerator.new();
  req.context.playground.createRoom(id);
  res.status(201).json({ id });
};

const createGameRouter = (context) => {
  const gameRouter = express.Router();

  gameRouter.use((req, _res, next) => {
    req.context = context;
    next();
  });

  gameRouter.post("/game", createRoom);

  return gameRouter;
};

module.exports = { createGameRouter };
