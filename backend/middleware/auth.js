const jwt = require("jsonwebtoken");
const config = require("../config/dbConfig.json");

module.exports = function (req, res, next) {
  const webtoken = req.header("token");

  if (!webtoken) {
    return res
      .status(400)
      .json({ msg: "Authentication Error, Please Login !!" });
  }
  try {
    const decodedtoken = jwt.verify(webtoken, config.privateKey);
    req.user = decodedtoken.user;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ msg: "Invalid Token or Expired Token, Please Login again" });
  }
};
