const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const DB_CONNECTION = require("./config/connect");
const app = express();
const PORT = process.env.port || 5000;

DB_CONNECTION();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: "*" }));
app.use(cookieParser());

//public routes
app.use("/signup", require("./routes/signup"));
app.use("/signin", require("./routes/signin"));

//private routes
app.use("/home", require("./routes/home"));
app.use("/profile", require("./routes/profile"));
app.use("/submitentry", require("./routes/submitentry"));
app.use("/deleteentry", require("./routes/deleteentry"));
app.use("/editentry", require("./routes/editentry"));

app.listen(PORT, () => console.log(`server running on port: ${PORT}`));
