let express = require('express');
let router = express.Router();
let User = require('../models/user');

/* GET users listing. */

router.route('/')
    .get( function(req, res, next) {
        let data = req.body;
        User.find({}, function (err, users) {
            if (!err) {
                if (req.session)
                    res.send(users);
            } else {
                res.status(500).send({ "message": "Error get list of users from database"});
            }
        })
    })
    .post(function (req, res) {
        let data = req.body;
        let newUser = new User();
        newUser.login = data.login;
        newUser.password = data.password;
        newUser.save(function (err) {
            if (err)
                res.status(501).send({ "message": "Cant create a new user"});
        })
    });

router.route('/:id')
    .get(function (req, res) {
        let id = req.params.id;
        User.findById(id, function (err, user) {
            if (!err) {
                res.send(user);
            } else {
                res.status(500).send({ "message": "Error get user from database"});
            }
        });
    })
    .put(function (req,res) {
        let data = req.body;
        let id = req.params.id;
        User.findOneAndUpdate({ _id : id },{ $set : data }, function (err, result) {
            if (!err) {
                res.json({"message": "User was updated"});
            } else {
                res.status(501).json({"message": "Cant update user info"});
            }
        });
    })
    .delete(function (req,res) {
        let id = req.params.id;
        User.deleteOne({_id : id}, function (err) {
            if (!err) {
                res.json({"message": "Successfully deleted"})
            } else {
                res.status(501).json({"message": "Cant delete a user"});
            }
        });
    });

module.exports = router;
