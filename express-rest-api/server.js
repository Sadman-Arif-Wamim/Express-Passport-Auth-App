require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT;
const userRoutes = require('./routes/userroutes');
const loginRoutes = require('./routes/login');
const passport = require('./config/passport-config');

app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");    
});

mongoose.connect(process.env.DATABASE_URL)
    .then(() => {
        console.log('AppDB connected');
        app.listen(PORT, () => {
            console.log('Server is running');
        });
    })
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', loginRoutes);