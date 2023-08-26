const express = require("express");
const gameRouter = require("./game-router");
const masterRouter = new express.Router();

masterRouter.use(gameRouter);

module.exports = masterRouter;
