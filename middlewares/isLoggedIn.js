const jwt = require("jsonwebtoken");
const userModel = require("../models/userModels");

module.exports.isLoggedIn = async (req, res, next) => {
  if (!req.cookies.token) {
    req.flash("error", "you need to login first");
    res.redirect("/");
    return;
  }
  try {
    let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    req.user = user;

    next();
  } catch (error) {
    res.send("error", "somthing went wrong");
    res.redirect("/");
  }
};
