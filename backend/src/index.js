require("dotenv").config("");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config");
const path = require("path");
const cors = require("cors");

const app = express();
const port = config.port || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "./app/views")));
require("./app/controllers/index")(app);
app.get("*", (req, res, next) => {
  if (res.status(404) && req.accepts("html")) {
    return res.sendFile(path.join(__dirname, "./app/views/404.html"));
  }
  next();
});

app.use((error, req, res, next) => {
  return res.status(500).json({ error: error.toString() });
});

let server = app.listen(port, function () {
  let host =
    server.address().address === "::" ? "localhost" : server.address().address;
  let port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
});
