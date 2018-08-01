let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    s_id: String,
    name: String,
    passwordHash: String
});

module.exports = mongoose.model('User', userSchema);