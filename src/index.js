require("dotenv").config("");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config/config.js");
const cors = require("cors");

const app = express();
const port = config.port || 3333;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("./app/controllers/index")(app);

app.get("/healthcheck", (req, res) => {
  return res.status(200).json({ success: true, message: "Server is OK" });
});

let server = app.listen(port, function () {
  let host =
    server.address().address === "::" ? "localhost" : server.address().address;
  let port = server.address().port;
  console.log(`Example app listening at http://${host}:${port}`);
});
