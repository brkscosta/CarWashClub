const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authconfig = require("../../config/auth.json");
const crypto = require("crypto");
const mail = require("../../mail/email");

generateToken = (params = {}) => {
  return jwt.sign(params, authconfig.secrect, {
    expiresIn: "10h",
  });
};

router.post("/register", async (req, res) => {
  let { email } = req.body;
  try {
    if (await User.findOne({ email })) {
      return res.status(404).json({
        success: false,
        message: `User already exists`,
      });
    }

    let user = await User.create(req.body);
    user.password = undefined;

    return res.status(201).json({
      success: true,
      user,
      token: generateToken({ id: user._id }),
    });
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .json({ success: false, error: "Registration failed" });
  }
});

router.post("/authenticate", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res
      .sendStatus(400)
      .json({ success: false, error: "Password and email are required" });
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user)
    return res
      .sendStatus(404)
      .json({ success: false, message: "User not found" });

  if (!(await bcrypt.compare(password, user.password)))
    return res
      .sendStatus(400)
      .json({ success: false, message: "Invalid Password" });

  user.password = undefined;

  return res.sendStatus(200).json({
    success: true,
    user,
    token: generateToken({ id: user._id }),
  });
});

router.post("/forgot_password", async (req, res) => {
  let { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user)
      return res.sendStatus(400).json({
        success: false,
        message: "User not found",
      });
    let token = crypto.randomBytes(20).toString("hex");

    let now = new Date();
    now.setHours(now.getHours() + 2);

    await User.findByIdAndUpdate(user._id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now,
      },
    });

    let params = {
      firstName: user.firstName,
      lastName: user.lastName,
      token: token,
    };
    const sent = await mail.isSendedEmail("resetPassword", params, email);

    if (sent)
      return res.sendStatus(200).sendStatus("Notificação enviada com sucesso");
    else
      return res
        .sendStatus(409)
        .sendStatus("Não foi possivel enviar a notificação");
  } catch (err) {
    return res
      .sendStatus(400)
      .json({ success: false, error: "Error on forgot password, try again" });
  }
});

router.post("/reset_password", async (req, res) => {
  let { email, token, password } = req.body;

  try {
    let user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user)
      return res
        .sendStatus(400)
        .json({ success: false, message: "User not found" });
    if (token !== user.passwordResetToken)
      return res
        .sendStatus(400)
        .json({ success: false, message: "Token invalid" });

    let now = new Date();

    if (now > user.passwordResetExpires)
      return res
        .sendStatus(400)
        .json({ success: false, message: "Token expired, generate a new one" });

    user.password = password;
    await user.save();

    return res
      .sendStatus(200)
      .json({ success: true, message: "Password reseted!" });
  } catch (err) {
    console.log(err);
    return res
      .sendStatus(400)
      .json({ success: false, error: "Cannot reset password" });
  }
});

route.put("/update_profile", (req, res) => {
  return res.sendStatus(200).json({ success: true });
});

module.exports = (app) => app.use("/auth", router);
