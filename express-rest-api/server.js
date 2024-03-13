const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");    
});

mongoose.connect('mongodb://127.0.0.1:27017/appdb')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log('Server is running')
  })
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);