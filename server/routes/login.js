let express = require('express');
let router = express.Router();
let User = require('../models/user');
let passport = require('passport');

/* GET users listing. */
router.post('/', function (req, res) {
    passport.authenticate('local', function (err, account) {
        req.logIn(account, function () {
            res.status(err ? 500 : 200).send(err ? err : account);
        });
    })(req, res);
});

module.exports = router;
