const mongoose = require("mongoose");
const config = require("config");
const db = config.get("MongoDB");

const DB_CONNECTION = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useUnifiedTopology: true,
    });
    console.log("Database connection established - mongodb: socialmedia_v1");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = DB_CONNECTION;
