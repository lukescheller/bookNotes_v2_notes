const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile_img: {
      type: Object,
      required: true,
    },
    access_token: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.email;
  delete userObject.access_token;
  // delete userObject.profile_img;
  // delete userObject.username;
  // delete userObject.createdAt;
  // delete userObject.updatedAt;
  return userObject;
};

UserSchema.methods.createToken = async function () {
  const token = jwt.sign(
    { user: this._id.toString() },
    config.get("jwtSecret"),
    //15min
    { expiresIn: "900s" }
  );
  // this.login_Tokens = this.login_Tokens.concat({ token });
  // this.refresh_token = token;

  //you might be able to just replace the previous token.....
  this.access_token = token;
};

UserSchema.statics.signIn = async (email, password) => {
  //{email: email} is equivilent to {email}
  // guess you can call User even though it's defined later
  const user = await User.findOne({ email }).populate("comments");
  if (!user) {
    throw new Error("Invalid Email: Sign-Up");
  }

  const isM = await bcrypt.compare(password, user.password);

  //you don't want to be too specific with your error messages - just say something to the effect of 'invalid credentials'
  if (!isM) {
    throw new Error("Email or Password Incorrect");
  }

  return user;
};

const User = mongoose.model("user", UserSchema);

module.exports = User;
