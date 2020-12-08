require("dotenv").config("");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config.js");
const path = require("path");
const cors = require("cors");

const app = express();
const port = config.port || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./app/views")));
require("./app/controllers/index")(app);

app.get("/healthcheck", (req, res) => {
  return res.status(200).json({ success: true, message: "Server is OK!" });
});

app.get("/reset_password", (req, res) => {
  return res.sendFile(path.join(__dirname, "./app/views/reset-password.html"));
});

let server = app.listen(port, function () {
  let host =
    server.address().address === "::" ? "localhost" : server.address().address;
  let port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});
