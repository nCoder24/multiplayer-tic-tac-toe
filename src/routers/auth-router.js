const express = require("express");

const loginUser = (req, res) => {
  const username = req.body.username;
  res.cookie("username", username);
  res.status(201).end();
};

const createAuthRouter = () => {
  const authRouter = new express.Router();
  authRouter.post("/auth/login", loginUser);
  return authRouter;
};

module.exports = { createAuthRouter };
