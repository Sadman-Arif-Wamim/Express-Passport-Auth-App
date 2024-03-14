const express = require('express');
const router = express.Router();
const passport = require('../config/passport-config');
const User = require('../models/user');

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

module.exports = router;