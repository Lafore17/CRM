let LocalStrategy = require('passport-local').Strategy;

let User = require('../../models/user');

let myLocalConfig = (passport) => {
    passport.serializeUser(function (user, done) {
        console.log('serializing');
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        console.log("deserializing");
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },function (username, password, done) {
        console.log("LOGIN:", username);
        console.log("Password:", password);
        process.nextTick(function () {
            User.findOne({ login: username}, function (err, user) {
                if (err)
                    return done(err);
                if (!user) {
                    let newUser = new User();
                    newUser.login = username;
                    newUser.password = password;
                    newUser.save(function (err) {
                        if (err)
                            return done(err);
                    });
                    user = newUser;
                }
                if (!user.validPassword(password))
                    return done(null, false);
                else
                    return done(null, user);
            });
        });
    }));
};

module.exports = myLocalConfig;
