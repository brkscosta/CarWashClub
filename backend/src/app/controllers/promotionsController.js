const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const path = require("path");

router.use(authMiddleware); //Check if user is logged in

router.get("/", (req, res) => {
  return res.status(200).json({ ok: true, user: req.userId });
});

module.exports = (app) => app.use("/promotions", router);
