const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const UserLogin = require('../models/userlogs');

router.get('/all', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const users = await User.find({});
    res.json(users);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const requestedUser = req.query.user;

  if (req.user.role === 'admin' || req.user.username === requestedUser) {
    const user = await User.findOne({ username: requestedUser }, 'username name age gender');
    res.json({ user });

  } else {
    res.status(403).json({ error: 'Not authorized' });
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

router.put('/update-role/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const requestedUser = req.query.user;

      if (req.user.role !== 'admin' && req.user.username !== requestedUser) {
          return res.status(403).json({ error: 'Not authorized' });
      }

      const { username } = req.params;
      const { role } = req.body;

      if (!role || (role !== 'regular' && role !== 'premium')) {
          return res.status(400).json({ error: 'Invalid role' });
      }

      const updatedUser = await UserLogin.findOneAndUpdate(
          { username },
          { $set: { role } },
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ error: 'User not found' });
      }

      res.json({ message: 'Role updated successfully', details: {id: updatedUser.id, username: updatedUser.username,  role: updatedUser.role} });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;