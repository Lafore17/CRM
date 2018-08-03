let express = require('express');
let router = express.Router();
let User = require('../models/user');
let passport = require('passport');

/* GET users listing. */
router.post('/', passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login'
}));

module.exports = router;
