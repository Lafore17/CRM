let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    s_id: String,
    login: String,
    password: String
});

userSchema.methods.validPassword = function(password) {
    return password === this.password;
};
module.exports = mongoose.model('User', userSchema, "users");