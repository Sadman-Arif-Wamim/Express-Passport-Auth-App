const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    id: Number,
    username:String,
    password:String
});

const Admin = mongoose.model("adminlogs", adminSchema);

module.exports = Admin;