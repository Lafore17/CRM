let mongoose = require('mongoose');

let companySchema = mongoose.Schema({
    s_id: String,
    name: String,
    contact: String,
    phone: String,
    site: String
});

module.exports = mongoose.model('Company', companySchema);