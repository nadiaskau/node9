const express = require('express');
const router = express.Router();
const mongCountry = require("../models/handleCountriesMong.js");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Fragments of the World',
        subtitle: 'Display and Register World Data'
    });
});

router.get('/country', function(req, res, next) {
    mongCountry.getCountries(res);
});
router.get('/country/:country', function(req, res, next) {
    mongCountry.getCountry(res, req.params.country);
});
router.post("/country", function(req, res, next) {
    mongCountry.getCountry(res, req.body.ctry);
});

router.get("/continent", function(req, res, next) {
    mongCountry.getContinentsAndGovernment(res, 'continent', 'Select continent');
});

router.get('/continent/:continent', function(req, res, next) {
    mongCountry.getContinentLanguages(res, req.params.continent);
});

router.post("/continent", function(req, res, next) {
    mongCountry.getContinentLanguages(res, req.body.continent);
});

router.get('/countryData', function(req, res, next) {
    mongCountry.getContinentsAndGovernment(res, 'countryData', 'Register country');
});
router.post("/countryData", function(req, res, next) {
    mongCountry.postCountry(req, res, next);
});

router.get('/languages', function(req, res, next) {
    mongCountry.getLanguages(res);
});

router.get('/language', function(req, res, next) {
    mongCountry.getLanguageSelection(res);
});

router.post('/language', function(req, res, next) {
    mongCountry.getLanguageRank(res, req.body.language);
});

router.get('/countriesSorted', function(req, res, next){
    mongCountry.countriesPrContinent(res);
});

router.get('/cities', function(req, res, next){
    mongCountry.getCityNamesakes(res);
});

module.exports = router;