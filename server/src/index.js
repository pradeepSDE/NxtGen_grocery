const cors = require("cors");
const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const app = express();
const authenticateJWT = require("./midldlewares/authenticateJWT");
const createPayment = require("./controllers/paymentControl");
app.use(cookieParser());
app.use(
  session({
    secret: "your-secret-key", // Change this to a strong secret key
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: { secure: false }, // Set true if using HTTPS
  })
);

// Initialize Passport and session management
const corsOptions = {
  credentials: true,
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://nxt-gen-grocery-fe.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "authorization"],
};

app.use(cors(corsOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });
app.use("/", require("./routes/authRoute"));
app.use(express.urlencoded({ extended: false }));
// app.use("/", require("./helper/authCheck"));
app.use("/api", authenticateJWT, require("./routes/orderRoute"));
app.use("/product", require("./routes/productRoute"));
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
app.post("/payment",createPayment);
//db conection //
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log(err);
  });
