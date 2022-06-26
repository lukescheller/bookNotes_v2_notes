const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  try {
    if (req.body.cookie === true) {
      //check token - you may be able to add this on every page
      const decoded = jwt.verify(req.body.token, config.get("jwtSecret"));

      // don't worry about checking token for validity - if it's expired it'll throw an error

      //create new token - refresh token
      const token = jwt.sign(
        { user: decoded.user },
        config.get("jwtSecret"),
        //15min
        { expiresIn: "900s" }
      );

      //find user
      const user = await User.findOne({
        _id: decoded.user,
      }).populate("comments");

      //assign token to user model
      user.access_token = token;

      //save user with new token
      await user.save();

      //respond with new cookie
      res.cookie("access_token", token);

      // // //...until here seems to be the refresh token solution
      res.send(user);
    }

    if (req.body.cookie === false) {
      throw new Error("JWT expired or not present");
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
