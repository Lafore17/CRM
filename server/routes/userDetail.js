let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.post('/', function(req, res, next) {
    let data = req.body;
    let userForCheck = {
        login: data.login
    };
    console.log(`LOGIN: ${data.login} PASSWORDHASH: ${data.password}`);
    User.findOne( userForCheck , function (err, user) {
       if (!err) {
           if (user) {
               if (user.passwordHash === data.password) {
                   res.send(user);
               } else {
                   res.statusCode = 406;
                   res.send("Login just exist");
               }
           } else {
               userForCheck['passwordHash'] = data.password;
               let newUser = new User(userForCheck);
               newUser.save(userForCheck);
               res.send(userForCheck);
           }
       }
    });
});

module.exports = router;
