const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../model/User");
const config = require("../config/dbConfig.json");
const auth = require("../middleware/auth");
const { request, response } = require("express");

var ml_baseUrl = "http://ec2-3-86-218-191.compute-1.amazonaws.com:8080/search/";
var params = "iphone",
  apple;
router.get("/", auth, async (req, res) => {
  try {
    request.get(`${ml_baseUrl}${params}`, function (error, response, body) {
      // console.log(error);
      // console.log(response);
      // console.log(response);
      res.send();
      console.log(body);
    });

    // const user = await User.findById(req.user.id);
    // res.json(user);
  } catch (error) {
    console.log(error);
    res.send({ message: "Error in Fectching User details , Refresh the page" });
  }
});

module.exports = router;
