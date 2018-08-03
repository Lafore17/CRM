let mongoose = require('mongoose');

let companySchema = mongoose.Schema({
    s_id: String,
    creator: String,
    name: String,
    contact: String,
    phone: String,
    site: String
});

module.exports = mongoose.model('Company', companySchema, "companies");