const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();

router.use(authMiddleware);

router.get("/", (req, res) => {
  return res.sendStatus({ ok: true, user: req.userId });
});

module.exports = (app) => app.use("/promotions", router);
