const express = require("express");
const { checkNotAuthenticated } = require("../middleware/auth-middleware");

const loginUser = (req, res) => {
  const username = req.body.username;
  res.cookie("username", username);
  res.status(201).end();
};

const sendLoginPage = (req, res) => {
  res.sendFile(process.env.PWD + "/pages/login.html");
};

const createAuthRouter = () => {
  const authRouter = new express.Router();

  authRouter.get("/login", checkNotAuthenticated, sendLoginPage);
  authRouter.post("/login", checkNotAuthenticated, loginUser);

  return authRouter;
};

module.exports = { createAuthRouter };
