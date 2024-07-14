const express = require("express");
const router = express.Router();
const productModel = require("../models/ProductModel");
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const userModels = require("../models/userModels");

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, isLoggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  try {
    const products = await productModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
  } catch (error) {}
});

module.exports = router;

router.get("/addToCart/:id", isLoggedIn, async (req, res) => {
  try {
    let user = await userModels.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();

    req.flash("success", "Added to Cart");
    res.redirect("/shop");
  } catch (error) {
    req.flash("success", error.message);
    res.redirect("/shop");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  const user = await userModels
    .findOne({ email: req.user.email })
    .populate("cart");

  res.render("cart", { items: user.cart });
});

module.exports = router;
