const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/user');
const app = express();
const PORT = process.env.PORT || 3000;

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

  
  app.get('/getUsers', (req, res) => {
    UserModel.find({})
      .then(function(users){
        res.json(users);
      })
      .catch(function(err) {
        console.log(err);
        res.status(500).json({ error: 'Server error' });
      });
  });

  app.get('/getUserByName', async (req, res) => {
    try {
      const { name } = req.query;
    
      const user = await UserModel.findOne({ name }, 'name age');

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  });