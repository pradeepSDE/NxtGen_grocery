const cors = require('cors');
const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const coookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json())
app.use(cookieParser())
app.use('/', require('./routes/authRoute'));
app.use(express.urlencoded({ extended: false }));
const port = 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})
//db conection //
mongoose.connect(process.env.MONGO_URL)
.then(()=>{
  console.log("db connected")
})
.catch((err)=>{
  console.log(err)
})  