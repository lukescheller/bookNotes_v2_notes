const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async (req, res) => {
  try {
    //email
    if (!req.body.signInEmail) {
      throw new Error("Email Required");
    }

    //valid email
    if (req.body.signInEmail) {
      const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
      if (!validateEmail(req.body.signInEmail)) {
        // throw new Error("fuck you, invalid email");
        throw new Error("Valid Email Required");
      }
    }

    //password
    if (!req.body.signInPassword) {
      throw new Error("Password Required");
    }

    //check user via schema function
    const user = await User.signIn(
      req.body.signInEmail,
      req.body.signInPassword
    );

    // //create token
    user.createToken();

    // //save user
    await user.save();

    // //res cookie
    res.cookie("access_token", user.access_token);

    //res send
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
