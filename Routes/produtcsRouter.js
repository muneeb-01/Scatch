const express = require("express");
const router = express.Router();
const upload = require("../config/multe-config");
const productModel = require("../models/ProductModel");

router.post(
  "/admin/createProduct",
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, discount, bgcolor, panelcolor, textcolor } =
        req.body;

      const product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        discount,
        bgcolor,
        panelcolor,
        textcolor,
      });
      req.flash("success", "Product created successfully!!!");
      res.redirect("/owners/createProduct");
    } catch (error) {}
  }
);

module.exports = router;
