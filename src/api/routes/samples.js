const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const checkAuth = require("../../middleware/auth");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(200).json({ result: "Failed", message: "Auth failed" });
  }
  // const isMatched = await bcrypt.compare(req.body.password, user.password);
  const isMatched = req.body.password === user.password;
  if (!isMatched) {
    return res.status(200).json({ result: "Failed", message: "Auth failed" });
  }
  const userFound = {
    email: user.email,
    _id: user._id,
    name: user.name,
    phone: user.phone,
    representativeName: user.representativeName,
    alias: user.alias,
    companyName: user.companyName,
    location: user.location,
    age: user.age,
    role: user.role,
  };
  const token = jwt.sign(userFound, "navi_sharma_secret_key", {
    expiresIn: "24h"
  });

  res.status(200).json({ user: userFound, token });
});


router.put("/change-password", async (req, res, next) => {
  const user = await User.findById(req.body.userId);

  const isMatched = await bcrypt.compare(req.body.oldPassword, user.password);
  if (!isMatched) {
    return res
      .status(200)
      .json({ result: "Failed", message: "Current password didn't match" });
  }

  const hash = await bcrypt.hash(req.body.newPassword, 10);
  if (!hash) {
    return res
      .status(500)
      .json({ result: "Failed", message: "Password changed failed" });
  }
  user.phone = 9781186104;
  user.password = hash;
  const newUser = await user.save();

  res
    .status(200)
    .json({
      user: newUser,
      result: "Success",
      message: "Password changed successfully"
    });
});

router.put("/phone", async (req, res, next) => {
  const user = await User.findById(req.body.userId);

  const isMatched = await bcrypt.compare(req.body.password, user.password);
  if (!isMatched) {
    return res
      .status(200)
      .json({ result: "Failed", message: "Password didn't match" });
  }

  user.phone = req.body.phone;
  const newUser = await user.save();

  res
    .status(200)
    .json({
      user: newUser,
      result: "Success",
      message: "Phone number changed successfully"
    });
});


module.exports = router;
