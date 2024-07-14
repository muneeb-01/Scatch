const userModel = require("../models/userModels");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (fullname === "" || email === "" || password === "") {
      return res.status(404).send("Somthing went wrong");
    }
    const user = await userModel.findOne({ email: email });

    if (user) return res.status(401).send("Invalid email or username");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) {
          res.send(err.message);
        } else {
          let user = await userModel.create({
            fullname,
            password: hash,
            email,
          });

          const token = generateToken(user);
          res.cookie("token", token);
          res.redirect("/shop");
        }
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  if (!user) return res.status(404).send("Invalid email address");

  bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else {
      res.send("Invalid email or password");
    }
  });
};

module.exports.logoutUser = (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
};
