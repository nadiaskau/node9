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
    gnpold: Number, 
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

//COUNTRYLANGUAGE
const countrylangSchema = mongoose.Schema({
    countrycode: String, 
    language: String,
    isoffical: Boolean, 
    percentage: Number
});
const CountryLanguage = mongoose.model("CountryLanguage", countrylangSchema, 'countrylanguage'); 

//Exports
exports.Country = Country; 
exports.Continent = Continent; 
exports.Government = Government;
exports.CountryLanguage = CountryLanguage;