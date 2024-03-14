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

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    const requestedUser = req.query.user;

    if (req.user.role === 'admin' || req.user.username === requestedUser) {

        res.json({ message: 'Authorized'});
        
    } else {

        res.status(403).json({ error: 'Not authorized' });
    }
});

module.exports = router;