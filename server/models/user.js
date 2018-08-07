let mongoose = require('mongoose');
let crypto = require('crypto');

let userSchema = mongoose.Schema({
    s_id: String,
    login: String,
    password: String
});

userSchema.methods.validPassword = function(password) {
    return crypto.createHash('md5').update(password).digest('hex') === this.password;
};
module.exports = mongoose.model('User', userSchema, "users");