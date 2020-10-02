const mongoose = require("mongoose");
const config = require("../config/config");

mongoose.connect(config.atlasUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
