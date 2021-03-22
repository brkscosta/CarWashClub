const jwt = require("jsonwebtoken");
const config = require("../../config");
const path = require("path");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .sendFile(path.join(__dirname, "../views/unauthorized.html"));

  let parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res
      .status(401)
      .sendFile(path.join(__dirname, "../views/unauthorized.html"));

  let [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res
      .status(401)
      .sendFile(path.join(__dirname, "../views/unauthorized.html"));

  jwt.verify(token, config.secretHashKeyToken, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .sendFile(path.join(__dirname, "../views/unauthorized.html"));
    }
    req.userId = decoded.id;
    return next();
  });
};
