import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    console.log("Signup request:", req.body);
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json("All fields are required");
    }
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }
    
    const hash = await bcrypt.hash(password, 10);
    
    const user = await User.create({
      name,
      email,
      password: hash
    });
    
    console.log("User created:", user.email);
    res.status(201).json({ message: "User created successfully" });
    
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json("Server error during signup");
  }
});

router.post("/signin", async (req, res) => {
  try {
    console.log("Signin request received");
    console.log("Request body:", req.body);
    
    const { email, password } = req.body;
    
    if (!email || !password) {
      console.log("Missing email or password");
      return res.status(400).json("Email and password are required");
    }
    
    console.log("Looking for user with email:", email);
    const user = await User.findOne({ email });
    
    if (!user) {
      console.log("User not found:", email);
      return res.status(400).json("User not found");
    }
    
    console.log("User found:", user.email);
    console.log("User has password:", !!user.password);
    
    const match = await bcrypt.compare(password, user.password);
    console.log("Password match:", match);
    
    if (!match) {
      console.log("Password mismatch for:", email);
      return res.status(400).json("Wrong password");
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      "secret",
      { expiresIn: "7d" }
    );
    
    console.log("Signin successful for:", email);
    res.json({ 
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
    
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json("Server error during signin");
  }
});

router.post("/google", async (req, res) => {
  try {
    console.log("Google auth request received");
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json("Google token required");
    }
    
    const googleRes = await axios.get(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
    );

    console.log("Google response:", googleRes.data);
    
    const { email, name, sub } = googleRes.data;

    let user = await User.findOne({ email });

    if (!user) {
      console.log("Creating new user from Google auth");
      user = await User.create({
        name,
        email,
        googleId: sub
      });
    }

    const jwtToken = jwt.sign(
      { id: user._id, email: user.email },
      "secret",
      { expiresIn: "7d" }
    );

    res.json({ 
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Google auth error:", error.response?.data || error.message);
    res.status(500).json("Server error during Google authentication");
  }
});

export default router; 