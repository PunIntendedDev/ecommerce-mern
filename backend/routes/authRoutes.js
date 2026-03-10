const router = require("express").Router();
const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const axios = require("axios");


router.post("/signup", async (req,res)=>{

  const {name,email,password} = req.body;

  const hash = await bcrypt.hash(password,10);

  const user = await User.create({
    name,
    email,
    password:hash
  });

  res.json(user);

});


router.post("/signin", async (req,res)=>{

  const {email,password} = req.body;

  const user = await User.findOne({email});

  if(!user) return res.status(400).json("User not found");

  const match = await bcrypt.compare(password,user.password);

  if(!match) return res.status(400).json("Wrong password");

  const token = jwt.sign({id:user._id},"secret");

  res.json({token});

});


router.post("/google", async (req,res)=>{

  const {token} = req.body;

  const googleRes = await axios.get(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
  );

  const {email,name,sub} = googleRes.data;

  let user = await User.findOne({email});

  if(!user){

    user = await User.create({
      name,
      email,
      googleId:sub
    });

  }

  const jwtToken = jwt.sign({id:user._id},"secret");

  res.json({token:jwtToken});

});

module.exports = router;