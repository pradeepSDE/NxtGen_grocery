const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const coookieParser = require("cookie-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: { secure: false }, // Set true if using HTTPS
  })
);

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use("/", require("./routes/authRoute"));
app.use(express.urlencoded({ extended: false }));
app.use('/',require('./helper/authCheck'))
app.use('/api',require('./routes/orderRoute'))
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
//db conection //
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
