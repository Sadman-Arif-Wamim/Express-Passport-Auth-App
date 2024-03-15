const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport-config');
const UserLogin = require('../models/userlogs');

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await UserLogin.findOne({ username }, 'username password role');
        
        if (!user) {
            return res.status(401).json({ error: 'Invalid username' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); 
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

router.post('/register', async (req, res) => {
    try {
      const { name, username, age, gender, password } = req.body;
      const existingUser = await User.findOne({ username });
  
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const userLog = new UserLogin({
        username,
        password: hashedPassword,
        role: 'regular'
      });
  
      await userLog.save();
  
      const user = new User({
        username,
        name,
        age,
        gender
      });
  
      await user.save();
  
      res.status(201).json({ message: 'User registered successfully' });
    }
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


module.exports = router;