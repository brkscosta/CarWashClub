const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .json({ success: false, message: "No token provided" });

  let parts = authHeader.split(" ");

  if (!parts.length === 2)
    return res.status(401).json({ success: false, message: "Token error" });

  let [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res
      .status(401)
      .json({ success: false, message: "Token malformated" });

  jwt.verify(token, config.secretHashKeyToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    req.userId = decoded.id;
    return next();
  });
};
