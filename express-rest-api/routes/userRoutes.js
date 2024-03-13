const express = require('express');
const router = express.Router();

const User = require('../models/user');

router.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getUserByName', async (req, res) => {
  try {
    const { name } = req.query;
    const user = await User.findOne({ name }, 'name age');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;