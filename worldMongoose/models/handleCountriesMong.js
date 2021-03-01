const mongoose = require("mongoose");
const goose = require("./mongooseWrap");

//COUNTRY
const countrySchema = mongoose.Schema({
    code: String, 
    name: String, 
    continent: String, 
    region: String,
    surfacearea: Number, 
    indepyear: Number,
    population: Number,
    lifeexpectancy: Number,
    gnp: Number,
    gnpOld: Number, 
    localname: String,
    governmentform: String,
    headofstate: String,
    capital: Number, 
    code2: String
});
const Country = mongoose.model("Country", countrySchema, 'country');

//CONTINENT
const continentSchema = mongoose.Schema({
    name: String
}); 
const Continent = mongoose.model("Continent", continentSchema, 'continent');

//GOVERNMENTFORM
const governmentformSchema = mongoose.Schema({
    name: String
});
const Government = mongoose.model("Government", governmentformSchema, 'governmentform');

exports.getCountries = async function(res){
    try {
        let countries = await goose.retrieve(Country);
        res.render('country', {
            title: 'Fragments of the World',
            subtitle: 'Select Country',
            countries: countries
        });
    } catch (e) {
        console.log(e);
    }
};

exports.getCountry = async function (res, ctryname) {
    try {
        let countries = await goose.retrieve(Country);
        res.render('countryDisplay', {
            title: 'Fragments of the World',
            subtitle: ctryname,
            countries: countries
        });
    } catch (e) {
        console.log(e);
    }
}

//Register new country
exports.getContinentsAndGovernment = async function (res) {
    try {
        let con = await goose.retrieve(Continent); //get continents from that collection
        let gov = await goose.retrieve(Government); //get governtmentforms from that collection
        res.render('countryData', {
            title: 'Fragments of the World',
            subtitle: 'Select Country',
            continents: con, 
            governs: gov
        });
    } catch (e) {
        console.log(e);
    }
}