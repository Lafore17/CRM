let express = require('express');
let router = express.Router();
let Event = require('../models/event');

/* GET users listing. */

router.route('/')
    .get( function(req, res, next) {
        let userLogin = req.user.login;
        Event.find({ creator: userLogin}, function (err, events) {
            if (!err) {
                    res.send(events);
            } else {
                res.status(500).send({ "message": "Error get list of events from database"});
            }
        })
    })
    .post(function (req, res) {
        let data = req.body;
        let newEvent = new Event();
        newEvent.creator = req.user.login;
        newEvent.title = data.title;
        newEvent.type = data.type;
        newEvent.date = data.date;
        newEvent.description = data.description;
        newEvent.status = data.status;
        newEvent.save(function (err) {
            if (!err)
                res.json({"message" : "Successfully created!"});
            else
                res.status(501).send({ "message": "Cant create a new event"});
        })
    });

router.route('/:id')
    .get(function (req, res) {
        let id = req.params.id;
        Event.findById(id, function (err, event) {
            if (!err) {
                res.send(event);
            } else {
                res.status(500).send({ "message": "Error get event from database"});
            }
        });
    })
    .put(function (req,res) {
        let data = req.body;
        let id = req.params.id;
        Event.findOneAndUpdate({ _id : id },{ $set : data }, function (err, result) {
            if (!err) {
                res.json({"message": "Event was updated"});
            } else {
                res.status(501).json({"message": "Cant update event info"});
            }
        });
    })
    .delete(function (req,res) {
        let id = req.params.id;
        Event.deleteOne({_id : id}, function (err) {
            if (!err) {
                res.json({"message": "Successfully deleted"})
            } else {
                res.status(501).json({"message": "Cant delete an event"});
            }
        });
    });

module.exports = router;
