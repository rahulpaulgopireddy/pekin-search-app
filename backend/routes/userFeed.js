const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../model/User");
const config = require("../config/dbConfig.json");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.send({ message: "Error in Fectching User details , Refresh the page" });
  }
});

module.exports = router;
