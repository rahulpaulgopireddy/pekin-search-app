const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const config = require("../config/dbConfig.json");
const auth = require("../middleware/auth");

// Signup route
router.post(
  "/signup",
  [
    check("username", "Please Enter a Valid Username or use email as Username")
      .not()
      .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log(req.body);
    const authErrors = validationResult(req);
    if (!authErrors.isEmpty()) {
      return res.status(400);
    }
    const { username, email, password, phoneNumber } = req.body;
    try {
      //check for user in DB
      let user = await User.findOne({
        email,
      });
      // check user
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists",
        });
      }
      // create user based on schema
      user = new User({
        username,
        email,
        password,
        phoneNumber,
      });

      // hashing password
      const saltHash = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, saltHash);

      // save user
      await user.save();

      // add id
      const userPayload = {
        user: {
          id: user.id,
        },
      };

      //  JWT Token logic

      jwt.sign(
        userPayload,
        config.privateKey,
        {
          expiresIn: "24h",
        },
        (error, token) => {
          if (error) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (error) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

// login route

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({
        email,
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({
          msg: "User doesnt not exit , Please Signup",
        });
      }
      const isMatchPwd = await bcrypt.compare(password, user.password);

      // Password matching and error handling
      if (!isMatchPwd) {
        return res.status(400).json({
          msg: "Incorrect password! Please use correct password !",
        });
      }

      const userPayload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        userPayload,
        config.privateKey,
        {
          expiresIn: "24h",
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token,
          });
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.send({ message: "Error in Fectching User details , Refresh the page" });
  }
});

module.exports = router;
