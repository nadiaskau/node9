const express = require('express');
const router = express.Router();
const modCountry = require("../models/handleCountries");
const mongCountry = require("../models/schemas.js");
const mongoose = require("../models/mongooseWrap");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Fragments of the World',
        subtitle: 'Display and Register World Data'
    });
});

router.get('/country', function(req, res, next) {
    modCountry.getCountries(res);
    mongCountry.getCountries(res);
    //mongoose.retrieve();
});
router.get('/country/:country', function(req, res, next) {
    modCountry.getCountry(res, req.params.country);
});
router.post("/country", function(req, res, next) {
    modCountry.getCountry(res, req.body.ctry);
});

router.get('/countryData', function(req, res, next) {
    modCountry.getContinentsAndGovernment(res);
});
router.post("/countryData", function(req, res, next) {
    modCountry.postCountry(req, res, next);
});

module.exports = router;