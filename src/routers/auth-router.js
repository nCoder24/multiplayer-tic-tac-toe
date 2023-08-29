const express = require("express");
const {
  checkNotAuthenticated,
  checkAuthenticated,
} = require("../middleware/auth-middleware");

const loginUser = (req, res) => {
  const username = req.body.username;
  res.cookie("username", username);
  res.status(201).end();
};

const sendProfile = (req, res) => {
  const username = req.cookies.username;
  res.json({ username });
};

const sendLoginPage = (_req, res) => {
  res.sendFile(process.env.PWD + "/pages/login.html");
};

const logoutUser = (_req, res) => {
  res.clearCookie("username");
  res.redirect("/auth/login");
};

const createAuthRouter = () => {
  const authRouter = new express.Router();

  authRouter.get("/profile", checkAuthenticated, sendProfile);
  authRouter.get("/logout", checkAuthenticated, logoutUser);
  authRouter.get("/login", checkNotAuthenticated, sendLoginPage);
  authRouter.post("/login", checkNotAuthenticated, loginUser);

  return authRouter;
};

module.exports = { createAuthRouter };
