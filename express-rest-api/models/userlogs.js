const mongoose = require('mongoose');

const loginSchema = new mongoose.Schema({
    username:String,
    password:String,
    role:String
});

const UserLogin = mongoose.model("userlogs", loginSchema);

module.exports = UserLogin;