const express = require("express");

const createRoom = (req, res) => {
  const id = req.context.idGenerator.new();
  req.context.playground.createRoom(id);
  res.status(201).json({ id });
};

const joinRoom = (req, res) => {
  const id = req.params.id;
  req.context.playground.joinRoom(id);
  res.send(`<h1>joined room ${id}</h1>`);
};

const createPlaygroundRouter = (context) => {
  const gameRouter = express.Router();

  gameRouter.use((req, _res, next) => {
    req.context = context;
    next();
  });

  gameRouter.post("/room/", createRoom);
  gameRouter.get("/room/:id", joinRoom);

  return gameRouter;
};

module.exports = { createPlaygroundRouter };
