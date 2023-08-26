const express = require("express");

const createRoom = (req, res) => {
  const id = req.context.idGenerator.new();
  req.context.playground.createRoom(id);
  res.status(201).json({ id });
};

const joinRoom = (req, res) => {
  const id = req.params.id;
  const username = req.cookies.username;

  req.context.playground.joinRoom(id, username);
  res.send(`<h1>joined room ${id}</h1>`);
};

const sendRoomStatus = (req, res) => {
  const id = req.params.id;
  const status = req.context.playground.roomStatus(id);
  res.json(status);
};

const createPlaygroundRouter = (context) => {
  const gameRouter = express.Router();

  gameRouter.use((req, _res, next) => {
    req.context = context;
    next();
  });

  gameRouter.post("/room/", createRoom);
  gameRouter.get("/room/:id", joinRoom);
  gameRouter.trace("/room/:id", sendRoomStatus);


  return gameRouter;
};

module.exports = { createPlaygroundRouter };
