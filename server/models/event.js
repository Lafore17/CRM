let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    creator : String,
    title: String,
    type: String,
    date: Date,
    description: String,
    status: String
});

module.exports = mongoose.model('Event', eventSchema, "events");