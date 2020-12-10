const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/index.html"));
});

router.get("/reset_password", (req, res) => {
  return res.sendFile(path.join(__dirname, "../views/reset-password.html"));
});

module.exports = (app) => app.use("", router);
