const mongoose = require("mongoose");

const ownerSchema = mongoose.Schema({
  fullname: String,
  password: String,
  email: String,
  Products: {
    type: Array,
    default: [],
  },
  picture: String,
  gstin: String,
});

module.exports = mongoose.model("owner", ownerSchema);
