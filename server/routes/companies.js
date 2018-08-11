let express = require('express');
let router = express.Router();
let Company = require('../models/company');

/* GET users listing. */

router.route('/')
    .get( function(req, res, next) {
        let userLogin = req.user.login;
        Company.find({ creator: userLogin}, function (err, companies) {
            if (!err) {
                res.send(companies);
            } else {
                res.status(500).send({ "message": "Error get list of companies from database"});
            }
        })
    })
    .post(function (req, res) {
        let data = req.body;
        let newCompany = new Company();
        newCompany.creator = req.user.login;
        newCompany.name = data.name;
        newCompany.contact = data.contact;
        newCompany.email = data.email;
        newCompany.phone = data.phone;
        newCompany.site = data.site;
        newCompany.save(function (err) {
            if (!err)
                res.json({"message" : "Successfully created!"});
            else
                res.status(501).send({ "message": "Cant create a new company"});
        })
    });

router.route('/:id')
    .get(function (req, res) {
        let id = req.params.id;
        Company.findById(id, function (err, company) {
            if (!err) {
                res.send(company);
            } else {
                res.status(500).send({ "message": "Error get company info from database"});
            }
        });
    })
    .put(function (req,res) {
        let data = req.body;
        let id = req.params.id;
        Company.findOneAndUpdate({ _id : id },{ $set : data }, function (err, result) {
            if (!err) {
                res.json({"message": "Company info was updated"});
            } else {
                res.status(501).json({"message": "Cant update company info"});
            }
        });
    })
    .delete(function (req,res) {
        let id = req.params.id;
        Company.deleteOne({_id : id}, function (err) {
            if (!err) {
                res.json({"message": "Successfully deleted"})
            } else {
                res.status(501).json({"message": "Cant delete a company"});
            }
        });
    });

module.exports = router;
