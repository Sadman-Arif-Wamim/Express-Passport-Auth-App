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

router.put('/update/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const requestedUser = req.query.user;

      if (req.user.role !== 'admin' && req.user.username !== requestedUser) {
          return res.status(403).json({ error: 'Not authorized' });
      }

      const { username } = req.params;
      const { role, name, age } = req.body;

      if (role && (role === 'regular' || role === 'premium')) {
          await UserLogin.findOneAndUpdate(
              { username },
              { $set: { role } }
          );
      } else {
        return res.status(400).json({ error: 'Invalid role' });
      }

      if (name || age !== undefined) {
          const updateFields = {};
          if (name) {
              if (!/^[a-zA-Z\s]+$/.test(name)) {
                  return res.status(400).json({ error: 'Name should contain only alphabets' });
              }
              updateFields.name = name;
          }
          if (age !== undefined) {
              if (typeof age !== 'number' || age < 0) {
                  return res.status(400).json({ error: 'Age should be a positive number' });
              }
              updateFields.age = age;
          }
          await User.findOneAndUpdate(
              { username },
              { $set: updateFields }
          );
      }

      res.json({ message: 'User details updated successfully'});
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/delete/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
      const requestedUser = req.query.user;
      
      if (req.user.role !== 'admin' && req.user.username !== requestedUser) {
          return res.status(403).json({ error: 'Not authorized' });
      }

      const { username } = req.params;

      await UserLogin.findOneAndDelete({ username });

      await User.findOneAndDelete({ username });

      res.json({ message: 'User deleted successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;