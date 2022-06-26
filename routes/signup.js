const express = require("express");
const router = express.Router();
const multer = require("multer");
const User = require("../models/User");
const bcrypt = require("bcryptjs/dist/bcrypt");

//multer
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
      return cb(new Error("jpg, jpeg, or png only"));
    }
    cb(undefined, true);
  },
});

//route
router.post("/", upload.single("file"), async (req, res) => {
  try {
    //duplicate user
    const duplicate = await User.findOne({
      email: req.body.signUpEmail,
    });
    if (duplicate) {
      throw new Error("Duplicate Email Found");
    }

    //username
    if (!req.body.signUpUserName) {
      throw new Error("Username Required");
    }

    //bio
    if (req.body.signUpBio === "") {
      req.body.signUpBio = "I'll work on my bio later..";
    }

    //email
    if (!req.body.signUpEmail) {
      throw new Error("Email Required");
    }

    //valid email format
    if (req.body.signUpEmail) {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

      if (!validateEmail(req.body.signUpEmail)) {
        throw new Error("Valid Email Required");
      }
    }

    //password
    if (!req.body.signUpPassword) {
      throw new Error("Password Required");
    }

    //profile image
    if (!req.file) {
      throw new Error("Profile Picture Required");
    }

    //create new user
    const user = new User({
      username: req.body.signUpUserName,
      bio: req.body.signUpBio,
      email: req.body.signUpEmail,
      password: req.body.signUpPassword,
      profile_img: req.file.buffer.toString("base64"),
    });

    //encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    //add token
    user.createToken();

    //save user
    await user.save();

    //res cookie
    res.cookie("access_token", user.access_token);

    //respond with new user
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
