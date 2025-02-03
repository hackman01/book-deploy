const User = require('../models/user.model');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



const signup = async (req, res) => {
    try {
      const { email, password, name } = req.body;
  
     
      if (!email || !password || !name) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }
  
    
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  

      const user = new User({
        email,
        password: hashedPassword,
        name
      });
  
      await user.save();
  
 
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
    
      const userResponse = user.toObject();
      delete userResponse.password;
  
      res.status(201).json({
        token,
        user: userResponse
      });
  
    } catch (error) {
      console.error('Signup error:', error);
      res.status(500).json({ message: 'Server error during signup' });
    }
  };


  const signin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
  

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
 
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
    
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
      );
  
     
      const userResponse = user.toObject();
      delete userResponse.password;
  
      res.json({
        token,
        user: userResponse
      });
  
    } catch (error) {
      console.error('Signin error:', error);
      res.status(500).json({ message: 'Server error during signin' });
    }
  };

module.exports = { signup, signin };
  