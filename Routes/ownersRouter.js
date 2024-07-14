const express = require("express");
const router = express.Router();
const ownerModel = require("../models/ownerModels");
const userModels = require("../models/userModels");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    const { fullname, email, password } = req.body;

    const owners = await ownerModel.find();
    const user = await userModels.findOne({ email: email });

    if (owners.length > 0 || user) {
      return res.status(403).send("You are not allowed to create owner");
    }

    const createdOwner = await ownerModel.create({
      fullname,
      password,
      email,
    });

    res.status(201).send(createdOwner);
  });
}

router.get("/createProduct", (req, res) => {
  const success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;

// to set the enivironment variable use
// $env:NODE_ENV = "development"
