const User = require("../models/user");
const { hashedPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
const test = (req, res) => {
  res.json("Hello World!");
};
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const nameExist = await User.findOne({ name: name });
    if (nameExist) {
      return res.json({
        error: "Username already exists",
      });
    }
    if (!name) {
      return res.json({
        error: "please enter your name",
      });
    }
    if (!password || password.length < 8) {
      return res.json({
        error: "password must be at least 8 characters long",
      });
    }
    const exist = await User.findOne({ email });

    if (exist) {
      return res.json({
        error: "email already exists",
      });
    }

    const hashed = await hashedPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return res.json(user);
  } catch (error) {
    console.log(error);
  }
  // res.json('p')
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "email not found" });
    }
    const compare = await comparePassword(password, user.password);
    if (compare) {
        const token =   jwt.sign({ id: user._id , name:user.name, email: user.email }, process.env.JWT_SECRET);
        res.cookie("token", token);
         
      return res.json({ message: "login successful", data: {user:{
        id: user._id,
        name: user.name,
        email: user.email
      }}});
    } else {
      return res.json({ error: "password incorrect" });
    }
  } catch (e) {
    console.log(e);
  }
};

const profile= (req,res)=>{
  const {token }= req.cookies;
  if(token){
    jwt.verify(token, process.env.JWT_SECRET,{} ,async (err, user)=>{
      if(err) throw err ;
      res.json(user)
    })
  }else{
    res.json(null)
  }
}

const logout = (req,res)=>{
  const {token }= req.cookies;
  try {
    res.clearCookie('token')
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.log(error)
  }  
}
module.exports = { test, signup, signin, profile, logout };
