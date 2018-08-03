let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */
router.get('/', function (req, res) {
    res.status(200).json(req.user);
});

module.exports = router;
