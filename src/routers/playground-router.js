const express = require("express");
const {
  checkCurrentPlayer,
  checkRoomExists,
  checkRoomMember,
} = require("../middleware/playground-middleware");
const { checkAuthenticated } = require("../middleware/auth-middleware");

const symbols = {
  i: 0,
  symbols: ["X", "O"],

  next() {
    return this.symbols[this.i++ % this.symbols.length];
  },
};

const createRoom = (req, res) => {
  const id = req.context.idGenerator.new();
  req.context.playground.createRoom(id);
  res.status(201).json({ id });
};

const joinRoom = (req, res) => {
  const id = req.params.id;
  const username = req.cookies.username;
  const playground = req.context.playground;

  playground.joinRoom(id, { username, symbol: symbols.next() });

  const { isFull, game } = playground.roomStatus(id);
  if (isFull && !game) playground.startGame(id);

  res.sendFile(process.env.PWD + "/pages/room.html");
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

const sendPlaygroundHome = (_req, res) => {
  res.sendFile(process.env.PWD + "/pages/playground.html");
};


const createPlaygroundRouter = (context) => {
  const router = express.Router();

  router.use(checkAuthenticated);
  router.use((req, _res, next) => {
    req.context = context;
    next();
  });

  router.get("/", sendPlaygroundHome);
  router.post("/", createRoom);

  router.use("/:id", checkRoomExists);
  router.get("/:id", joinRoom);
  router.get("/:id/status", checkRoomMember, sendRoomStatus);
  router.post("/:id/play", checkRoomMember, startGame);
  router.post("/:id/move", checkRoomMember, checkCurrentPlayer, makeMove);

  return router;
};

module.exports = { createPlaygroundRouter };
