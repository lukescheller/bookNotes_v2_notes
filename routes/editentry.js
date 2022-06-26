const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Comment = require("../models/Comment");
var ObjectId = require("mongodb").ObjectID;
const config = require("config");

router.post("/", async (req, res) => {
  try {
    if (req.body.cookie === false) {
      throw new Error("JWT expired or not present");
    }
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

      //page number
      if (isNaN(req.body.page)) {
        throw new Error("Page must be a number");
      }

      //Comment model
      const comment_model = await Comment.findById({
        _id: req.body.commentId,
      });

      //book_title empty?
      if (req.body.book_title.trim() !== "") {
        comment_model.book_title = req.body.book_title;
      }

      //author empty
      if (req.body.author.trim() !== "") {
        comment_model.author = req.body.author;
      }

      //page empty?
      if (req.body.page.trim() !== "") {
        comment_model.page = req.body.page;
      }

      //comment empty?
      if (req.body.comment.trim() !== "") {
        comment_model.comment = req.body.comment;
      }

      //save comment
      await comment_model.save();

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
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
