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

const startGame = (req, res) => {
  const roomID = req.params.id;
  req.context.playground.startGame(roomID);
  res.status(204).end();
};

const makeMove = (req, res) => {
  const roomID = req.params.id;
  const position = req.body.position;
  req.context.playground.makeMove(roomID, position);
  res.status(204).end();
};

const sendPlaygroundPage = (req, res) => {
  res.sendFile(process.env.PWD + "/pages/playground.html");
};

const createPlaygroundRouter = (context) => {
  const playgroundRouter = express.Router();

  playgroundRouter.use((req, _res, next) => {
    req.context = context;
    next();
  });

  playgroundRouter.get("/room", sendPlaygroundPage);
  playgroundRouter.post("/room", createRoom);
  playgroundRouter.get("/room/:id", joinRoom);
  playgroundRouter.trace("/room/:id", sendRoomStatus);
  playgroundRouter.post("/room/:id/play", startGame);
  playgroundRouter.post("/room/:id/move", makeMove);

  return playgroundRouter;
};

module.exports = { createPlaygroundRouter };
