let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res) {
    req.logout();
    res.status(200).json({
       "message" : "successfully logout"
    });
});

module.exports = router;
