const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");
const crypto = require("crypto");
const mail = require("../../mail/email");
const apiMessages = require("../../config/api-messages.json");

generateToken = (params = {}) => {
  return jwt.sign(params, config.secretHashKeyToken, {
    expiresIn: "10h",
  });
};

router.post("/register", async (req, res) => {
  let { email } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).json({
        success: false,
        message: apiMessages.errors.userAlredyTaken,
      });
    }

    let user = await User.create(req.body);
    user.password = undefined;

    return res.status(201).json({
      success: true,
      user,
      token: generateToken({ id: user._id }),
      message: apiMessages.success.userTokenGenerated,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: apiMessages.errors.internalServerError,
    });
  }
});

router.post("/authenticate", async (req, res) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: apiMessages.errors.emptyFields,
    });
  }

  let user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: apiMessages.errors.userNotFound,
    });
  }

  let flag = await bcrypt.compare(password, user.password);

  if (!flag) {
    return res.status(400).json({
      success: true,
      message: apiMessages.errors.invalidPassword,
    });
  } else {
    user.password = undefined;

    return res.status(200).json({
      success: true,
      user,
      token: generateToken({ id: user._id }),
      message: apiMessages.success.userAuthenticated,
    });
  }
});

router.post("/forgot_password", async (req, res) => {
  let { email } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        success: false,
        message: apiMessages.errors.userNotFound,
      });
    let token = crypto.randomBytes(6).toString("hex");

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
      email: email,
    };

    let sent = await mail.isSendedEmail("resetPassword", params, email);

    if (sent)
      return res.status(200).json({
        success: true,
        message: apiMessages.success.notificationSended,
      });
    else
      return res.status(409).json({
        success: false,
        message: apiMessages.errors.cantSendNotification,
      });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: apiMessages.errors.internalServerError,
    });
  }
});

router.post("/reset_password", async (req, res) => {
  let { email, token, password } = req.body;

  try {
    let user = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!user)
      return res.status(404).json({
        success: false,
        message: apiMessages.errors.userNotFound,
      });
    if (token !== user.passwordResetToken)
      return res.status(400).json({
        success: false,
        message: apiMessages.errors.invalidToken,
      });

    let now = new Date();

    if (now > user.passwordResetExpires)
      return res.status(400).json({
        success: false,
        message: apiMessages.errors.tokenExpired,
      });

    user.password = password;
    await user.save(); // Save current user
    return res
      .status(200)
      .json({ success: true, message: apiMessages.success.passwordReset });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: apiMessages.errors.internalServerError,
    });
  }
});

router.put("/update_profile", (req, res) => {
  return res.status(200).json({ success: true });
});

module.exports = (app) => app.use("/auth", router);
