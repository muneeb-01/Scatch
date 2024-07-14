const mongoose = require("mongoose");
const config = require("config");

const dgbr = require("debug")("development:mongoose");

mongoose
  .connect(`${config.get("MONGOOSE_URI")}/scatch`)
  .then(function () {
    dgbr("connected to mongoose");
  })
  .catch(function (err) {
    dgbr("err from mongoose connection");
  });

module.exports = mongoose.connection;

//to run the debugger use
//$env:DEBUG='development:*'
