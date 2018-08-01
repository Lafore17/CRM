let mongoose = require('mongoose');

let eventSchema = mongoose.Schema({
    s_id: String,
    title: String,
    type: String,
    date: Date,
    description: String,
    status: String
});

module.exports = mongoose.model('Event', eventSchema, "events");