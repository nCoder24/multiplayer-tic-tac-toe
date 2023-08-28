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

  authRouter.use(checkNotAuthenticated);
  authRouter.get("/login", sendLoginPage);
  authRouter.post("/login",  loginUser);

  return authRouter;
};

module.exports = { createAuthRouter };
